import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

import colors from 'tailwindcss/colors'
import clsx from 'clsx'

interface Props extends TouchableOpacityProps {
  title: string
  checked?: boolean
  icon?: "check" | "x"
}

export function Checkbox({ title, checked = false, icon = "check", ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex-row mb-2 items-center" {...rest}>
      {checked ?
        <Animated.View
          className={clsx('h-8 w-8 rounded-lg items-center justify-center', {
            'bg-green-500': icon === "check",
            'bg-red-600': icon === "x"
          })}
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name={icon} size={20} color={colors.white} />
        </Animated.View>
        :
        <View className='h-8 w-8 bg-zinc-900 rounded-lg' />
      }
      <Text className={clsx('text-white text-base ml-3 font-semibold', {
        'line-through': checked,
        ['text-zinc-400']: checked
      })}>{title}</Text>
    </TouchableOpacity>
  )
}