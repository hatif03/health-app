import { View, Text } from 'react-native'
import React from 'react'
import Welcome from '../Components/Welcome'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutOTD from '../Components/WorkoutOTD'
import Seperator from '../Components/Seperator'
import Category from '../Components/Category'

const WorkoutScreen = () => {
  return (
    <SafeAreaView className=" mx-[2%]">
        <Welcome/>
        <WorkoutOTD/>
        <Seperator/>
        <Category/>
    </SafeAreaView>
  )
}

export default WorkoutScreen