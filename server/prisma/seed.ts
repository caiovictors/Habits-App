import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

const prisma = new PrismaClient()

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

const fourthHabitId = 'b3ca897a-08ae-416d-865f-466e97fef40e'
const fourthHabitCreationDate = new Date('2023-01-10T03:00:00.000')

const fifthHabitId = '4d796eb9-793f-4590-a9b3-989306e0119e'
const fifthHabitCreationDate = new Date('2023-01-01T03:00:00.000')

const sixthHabitId = '51531216-2b1b-4928-8073-33ffeffbc3d1'
const sixthHabitCreationDate = new Date('2023-01-04T03:00:00.000')

const seventhHabitId = '5bdb2ca2-96d4-44f0-8aa2-06ec6438f6b7'
const seventhHabitCreationDate = new Date('2023-01-11T03:00:00.000')

async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()


  const farAwayDay = dayjs('01-01-3000').endOf('day').toDate()

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Beber 2L água',
        created_at: firstHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
          ]
        },
        visible_until: farAwayDay
      }
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Exercitar',
        created_at: secondHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 3 },
            { week_day: 5 },
          ]
        },
        visible_until: farAwayDay
      }
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 8h',
        created_at: thirdHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        },
        visible_until: farAwayDay
      }
    }),

    prisma.habit.create({
      data: {
        id: fourthHabitId,
        title: 'Correr',
        created_at: fourthHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 2 },
            { week_day: 4 },
            { week_day: 6 },
          ]
        },
        visible_until: farAwayDay
      }
    }),
    prisma.habit.create({
      data: {
        id: fifthHabitId,
        title: 'Namorar',
        created_at: fifthHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 5 },
            { week_day: 6 },
            { week_day: 7 },
          ]
        },
        visible_until: farAwayDay
      }
    }),
    prisma.habit.create({
      data: {
        id: sixthHabitId,
        title: 'Fazer o ignite',
        created_at: sixthHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 3 },
            { week_day: 5 },
          ]
        },
        visible_until: farAwayDay
      }
    }),
    prisma.habit.create({
      data: {
        id: seventhHabitId,
        title: 'Tomar vitaminas',
        created_at: seventhHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        },
        visible_until: farAwayDay
      }
    }),
  ])

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          }
        }
      }
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: sixthHabitId,
          }
        }
      }
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: firstHabitId },
            { habit_id: secondHabitId },
          ]
        }
      }
    }),


    prisma.day.create({
      data: {
        date: new Date('2023-01-10T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: thirdHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-11T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: secondHabitId },
            { habit_id: sixthHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-14T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: fifthHabitId },
            { habit_id: seventhHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-15T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: seventhHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-19T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: seventhHabitId },
            { habit_id: fourthHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-20T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: fifthHabitId },
            { habit_id: sixthHabitId },
          ]
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-16T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: secondHabitId },
          ]
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-23T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: secondHabitId },
            { habit_id: sixthHabitId },
          ]
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-25T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: thirdHabitId },
            { habit_id: sixthHabitId },
          ]
        }
      }
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })