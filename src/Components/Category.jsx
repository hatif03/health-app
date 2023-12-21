import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import CategoryItems from './CategoryItems'

const Category = () => {
  return (
    <View>
      <View className=" flex-row items-center justify-between mx-10 mb-3">
        <Text className=" text-xl font-bold">Category</Text>
        <AntDesign name="swapright" size={30} color="black" />
      </View>
      <CategoryItems/>
    </View>
  )
}

export default Category