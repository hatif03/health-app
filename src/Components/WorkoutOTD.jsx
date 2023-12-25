import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import workout from "../../assets/images/workout.jpg"
import { TouchableOpacity } from 'react-native'
import {
    useFonts,
    Lato_700Bold,
  } from '@expo-google-fonts/lato';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../Firebase/config';
import { useNavigation } from "@react-navigation/native";

const WorkoutOTD = () => {

    let [fontsLoaded] = useFonts({
        Lato_700Bold,
      });

      const [workoutOTDUrl, setWorkoutOTDUrl] = useState(null);
      const [workoutName, setWorkoutName] = useState(null);
      const navigation = useNavigation();
    

    const getExerciseOTD = async () => {
        const date = new Date().getDate();
        const storageRef = ref(storage, "AllExercises/");
        listAll(storageRef).then(async (res) => {
          const exerciseUrl = res.items[date % 29].fullPath;
          await getDownloadURL(ref(storage, exerciseUrl)).then((url) => {
            setWorkoutOTDUrl(url);
            const exerciseName = exerciseUrl.split("/").pop();
            setWorkoutName(exerciseName);
          });
        });
        if (workoutOTDUrl && workoutName) {
          navigation.navigate("WorkoutOTDScreen", {
            url: workoutOTDUrl,
            name: workoutName,
          });
        }
      };

  return (
    <TouchableOpacity className="items-center justify-center my-5" onPress={getExerciseOTD}>
        <View className=" rounded-3xl overflow-hidden h-52 w-[90%]">
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