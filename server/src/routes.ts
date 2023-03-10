import { prisma } from "./lib/prisma"
import { FastifyInstance } from "fastify"
import dayjs from 'dayjs'
import { map, z } from 'zod'

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()
    const farAwayDay = dayjs('01-01-3000').endOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        },
        visible_until: farAwayDay
      }
    })


  })

  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = dayjs(parsedDate).get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        visible_until: {
          gte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []

    return { possibleHabits, completedHabits }
  })

  app.get('/habits', async (request) => {
    const possibleHabits = await prisma.habit.findMany({
      where: {
        visible: true
      },
      orderBy: {
        title: 'asc'
      },
      include: {
        weekDays: {
          select: {
            week_day: true
          },
        }
      },
    })

    return possibleHabits || []
  })

  app.patch('/habits/delete', async (request) => {
    const habitsToDelete = z.array(z.string().uuid()).parse(request.body)
    const today = dayjs().endOf('day').add(1).toDate()


    await prisma.habit.updateMany({
      where: {
        id: {
          in: habitsToDelete
        }
      },
      data: {
        visible_until: today,
        visible: false
      }
    })
  })


  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id,
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
            AND H.created_at <= D.date
            AND H.visible_until >= D.date
          WHERE HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int) 
        ) as amount
      FROM days D 
    `
    return summary
  })
}