import { useEffect, useState } from "react"
import * as Checkbox from '@radix-ui/react-checkbox'
import { TrashSimple, X } from 'phosphor-react';
import { api } from "../lib/axios"
import { weekDays } from "./SummaryTable";
import clsx from "clsx";

interface WeekDaysProps {
  week_day: number
}

interface HabitsList {
  id: string
  title: string
  created_at: string
  weekDays: WeekDaysProps[]
}

export function EditHabits() {
  const [habitsList, setHabitsList] = useState<HabitsList[] | undefined>()
  const [habitsToRemove, setHabitsToRemove] = useState<string[]>([])

  useEffect(() => {
    if (!habitsList) {
      api.get('habits').then(response =>
        setHabitsList(response.data)
      )
    }
  }, [])

  function handleAddHabitToRemove(habitId: string) {
    if (habitsToRemove.includes(habitId)) {
      setHabitsToRemove(habitsToRemove.filter(habit => habit !== habitId))
    } else {
      setHabitsToRemove(prevState => [...prevState, habitId])
    }
  }

  async function handleRemoveHabits() {
    try {
      await api.patch('habits/delete', habitsToRemove)
      alert('Hábitos removidos com sucesso!')

      setHabitsToRemove([])
      const updatedHabitsList = habitsList?.filter(habit => !habitsToRemove.includes(habit.id))
      setHabitsList(updatedHabitsList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='mt-6 flex gap-2 flex-col max-h-80 py-1 overflow-y-auto overflow-x-clip scrollbar'>
        {habitsList?.map(habit => {
          const availableDays = habit.weekDays.map(day => day.week_day)
          return (
            <Checkbox.Root
              key={habit.id}
              onCheckedChange={() => handleAddHabitToRemove(habit.id)}
              className='flex items-center justify-between gap-4 pr-2 group focus:outline-none disabled:cursor-not-allowed '
            >
              <div className='flex items-center justify-between w-full'>
                <span className='font-semibold txt-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 w-30 truncate'>
                  {habit.title}
                </span>
                <div>
                  {weekDays.map((day, index) =>
                    <span className={clsx("font-medium mr-1 text-zinc-400", {
                      'text-purple-700': availableDays.includes(index)
                    })}>
                      {day}
                    </span>
                  )}
                </div>
              </div>

              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-red-700 group-data-[state=checked]:border-red-800 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                <Checkbox.Indicator >
                  <X size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
            </Checkbox.Root >
          )
        })}
      </div >
      {
        habitsToRemove.length > 0 && (
          <button type="button" className="w-full mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-red-700 hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-zinc-900" onClick={handleRemoveHabits}>
            <TrashSimple size={20} weight="bold" />
            Remover hábitos
          </button>
        )
      }
    </div >
  )
}