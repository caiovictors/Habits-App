import { Text, View } from 'react-native';
import { HabitsList } from '../screens/EditHabits';
import { Checkbox } from "../components/Checkbox";
import clsx from 'clsx';

interface HabitInfoProps {
  habitsList: HabitsList[] | undefined
  item: HabitsList
  habitsToRemove: string[]
  handleRemove: (id: string) => void
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export function HabitInfo({ habitsList, item, habitsToRemove, handleRemove }: HabitInfoProps) {
  const availableDays = item.weekDays.map(day => day.week_day)

  return (
    <View className="flex-row  mt-3 justify-between border-b-zinc-800 border-b-2 h-20 items-center">
      <View className='w-4/5'>
        <Text numberOfLines={1} className="text-zinc-200 font-semibold text-lg">{item.title}</Text>
        <View className='flex-row'>
          {weekDays.map((day, index) =>
            <Text key={index} className={clsx("font-semibold mr-1 text-zinc-400", {
              'text-purple-700': availableDays.includes(index)
            })}>
              {day}
            </Text>
          )}
        </View>
      </View>
      <View className='items-center'>
        <Checkbox
          title=''
          checked={habitsToRemove.includes(item.id)}
          onPress={() => handleRemove(item.id)}
          icon="x"
        />
      </View>
    </View>

  )
}