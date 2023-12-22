import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import ExerciseItem from './ExerciseItem'

import exercise1 from "../../assets/images/exercise1.jpg"
import exercise2 from "../../assets/images/exercise2.jpg"
import exercise3 from "../../assets/images/exercise3.jpg"

const Exercise = () => {
  return (
    <View>
      <View className=" flex-row items-center justify-between mx-10 mb-3">
        <Text className=" text-xl font-bold">Exercises</Text>
        <AntDesign name="swapright" size={30} color="black" />
      </View>
      <ExerciseItem/>
    </View>
  )
}

export default Exercise