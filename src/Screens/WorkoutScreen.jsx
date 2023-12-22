import { View, Text } from 'react-native'
import React from 'react'
import Welcome from '../Components/Welcome'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutOTD from '../Components/WorkoutOTD'
import Seperator from '../Components/Seperator'
import Category from '../Components/Category'
import Exercise from '../Components/Exercise'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

const WorkoutScreen = () => {
  return (
    <SafeAreaView className=" mx-[2%]">
        <Welcome/>
        <GestureHandlerRootView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <WorkoutOTD/>
                <Seperator/>
                <Category/>
                <Seperator/>
                <Exercise/>
            </ScrollView>
        </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default WorkoutScreen