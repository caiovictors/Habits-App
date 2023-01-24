import { useState } from 'react'
import { Alert, View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import Animated, { BounceInLeft } from 'react-native-reanimated';
import HabitsBoxesIcon from '../assets/habits-boxes.svg'
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { api } from '../lib/axios';
import { useNavigation } from '@react-navigation/native';

const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const { navigate } = useNavigation()

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || !weekDays.length) {
        return Alert.alert('Novo Hábito', 'Informe o título do hábito e escolha a periodicidade')
      }
      await api.post('/habits', { title, weekDays })
      setTitle('')
      setWeekDays([])
      Alert.alert('Novo Hábito', 'Hábito criado com sucesso!', [
        {
          text: 'Ok',
          onPress: () => navigate('home'),
        },
      ])
      navigate('home')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o hábito')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <View className='mt-6 flex flex-row justify-between items-center'>
          <Text className=" text-white font-extrabold text-3xl">Criar hábito</Text>
          <Animated.View entering={BounceInLeft}>
            <HabitsBoxesIcon />
          </Animated.View>
        </View>
        <Text className="mt-6 text-white font-semibold text-base">Qual seu comprometimento?</Text>
        <TextInput
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          onChangeText={setTitle}
          value={title}
        />
        <Text className="mt-4 mb-3 text-white font-semibold text-base">Qual a recorrência?</Text>
        {availableWeekDays.map((day, index) => (
          <Checkbox key={day} title={day} checked={weekDays.includes(index)} onPress={() => handleToggleWeekDay(index)} />
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )

}