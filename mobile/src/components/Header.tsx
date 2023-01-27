import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'

import colors from 'tailwindcss/colors'

import Logo from '../assets/logo.svg'
import { useNavigation } from "@react-navigation/native";

export function Header() {
  const { navigate } = useNavigation()
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <View>
        <TouchableOpacity activeOpacity={0.7} className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center mb-2" onPress={() => navigate('new')}>
          <Feather name="plus" color={colors.violet[500]} size={20} />
          <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center" onPress={() => navigate('editHabit')}>
          <Feather name="clipboard" color={colors.violet[500]} size={20} />
          <Text className="text-white ml-3 font-semibold text-base">Hábitos</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}