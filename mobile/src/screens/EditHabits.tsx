import { useState, useEffect } from 'react'
import { Alert, View, Text, TouchableOpacity, FlatList } from "react-native";
import Animated, { BounceInLeft } from 'react-native-reanimated';
import HabitsBoxesIcon from '../assets/habits-boxes.svg'
import { BackButton } from "../components/BackButton";

import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { api } from '../lib/axios';
import { HabitsEmpty } from '../components/HabitsEmpty';
import { HabitInfo } from '../components/HabitInfo';
import clsx from 'clsx';
import { Loading } from '../components/Loading';

interface WeekDaysProps {
  week_day: number
}

export interface HabitsList {
  id: string
  title: string
  created_at: string
  weekDays: WeekDaysProps[]
}


export function EditHabits() {
  const [habitsList, setHabitsList] = useState<HabitsList[] | undefined>()
  const [habitsToRemove, setHabitsToRemove] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHabits()
  }, [])

  async function fetchHabits() {
    try {
      setLoading(true)
      const response = await api.get('/habits')
      setHabitsList(response.data)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregar os hábitos')
    } finally {
      setLoading(false)
    }
  }

  function handleAddHabitToRemove(habitId: string) {
    if (habitsToRemove.includes(habitId)) {
      setHabitsToRemove(habitsToRemove.filter(habit => habit !== habitId))
    } else {
      setHabitsToRemove(prevState => [...prevState, habitId])
    }
  }

  function handleRemoveHabits() {
    Alert.alert('Tem certeza que deseja remover os hábitos selecionados?',
      'Esta ação não poderá ser desfeita',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => removeHabits()
        }
      ],
    )
  }

  async function removeHabits() {
    try {
      await api.patch('/habits/delete', habitsToRemove)
      Alert.alert('Hábitos removidos com sucesso!')

      setHabitsToRemove([])
      const updatedHabitsList = habitsList?.filter(habit => !habitsToRemove.includes(habit.id))
      setHabitsList(updatedHabitsList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />
      <View className='mt-6 flex flex-row justify-between items-center mb-6'>
        <Text className=" text-white font-extrabold text-3xl">Seus hábitos</Text>
        <Animated.View entering={BounceInLeft}>
          <HabitsBoxesIcon />
        </Animated.View>
      </View>
      {loading ? <Loading /> : (
        <>
          <FlatList
            data={habitsList}
            className="mb-8"
            keyExtractor={item => item.id}
            renderItem={({ item }) => <HabitInfo habitsList={habitsList} item={item} habitsToRemove={habitsToRemove} handleRemove={handleAddHabitToRemove} />}
            ListEmptyComponent={HabitsEmpty}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            className={clsx("w-full h-14 flex-row items-center justify-center bg-red-700 rounded-md mb-6",
              {
                'bg-zinc-600 opacity-50': !habitsToRemove.length
              }
            )}
            onPress={handleRemoveHabits}
            disabled={!habitsToRemove.length}
          >
            <Feather name="trash" color={colors.white} size={20} />
            <Text className="text-white font-semibold ml-2">Remover hábitos</Text>
          </TouchableOpacity>
        </>
      )}

    </View >
  )
}