import { useState } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">Criar hábito</Text>
        <Text className="mt-6 text-white font-semibold text-base">Qual seu comprometimento?</Text>
        <TextInput
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600" />
        <Text className="mt-4 mb-3 text-white font-semibold text-base">Qual a recorrência?</Text>
        {availableWeekDays.map((day, index) => (
          <Checkbox key={day} title={day} checked={weekDays.includes(index)} onPress={() => handleToggleWeekDay(index)} />
        ))}
        <TouchableOpacity activeOpacity={0.7} className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
          <Feather name="check" size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )

}