import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Feather } from '@expo/vector-icons'

import colors from 'tailwindcss/colors'

export function HabitsEmpty() {
  const { navigate } = useNavigation()

  return (
    <View className='flex-1 mt-40'>
      <View className="items-center p-8">
        <Feather name="clipboard" size={80} color={colors.zinc[600]} />
      </View>
      <Text className="text-zinc-400 text-base text-center">Você ainda não possui nenhum hábito.</Text>
      <Text className="text-violet-600 text-base underline active:text-violet-500 text-center" onPress={() => navigate('new')}>Cadastrar novo</Text>
    </View>
  )
}