import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import workout from "../../assets/images/workout.jpg"
import { TouchableOpacity } from 'react-native'
import {
    useFonts,
    Lato_700Bold,
  } from '@expo-google-fonts/lato';
import { ref } from 'firebase/storage';
import { storage } from '../../Firebase/config';

const WorkoutOTD = () => {

    let [fontsLoaded] = useFonts({
        Lato_700Bold,
      });

    const getExerciseOTD = async () => {
        const date = new Date().getDate();
        console.log(date);
        const storageRef = ref(storage, "AllExercises/")
    };

  return (
    <TouchableOpacity className="items-center justify-center my-5" onPress={getExerciseOTD}>
        <View className=" rounded-3xl overflow-hidden h-40 w-[80%]">
            <ImageBackground
                source={workout}
                className=" flex-1 justify-center items-center"
                resizeMode='cover'
            >
                <View>
                    <Text className=" text-white/80 text-3xl tracking-tight" style={{fontFamily:'Lato_700Bold'}}>Workout of the Day</Text>
                </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>
  )
}

export default WorkoutOTD