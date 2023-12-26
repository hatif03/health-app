import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from '../../Firebase/config';
import countDownAudio from "../../assets/audio/countdownaudio.mp3";
import Audio from "expo-av";
import BackButton from '../Components/BackButton';
import exerciseData from "../../exercise_data.json";
import { AntDesign } from '@expo/vector-icons';

const CategoryExerciseScreen = () => {

    const route = useRoute();
    const {intensity} = route.params;

    const initTime = 60;
    const minTime = 10;
    const [time, setTime] = useState(initTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [countDownSound, setCountDownSound] = useState();
    const [exercises, setExercises] = useState([]);
    const [categoryExercise, setCategoryExercise] = useState([]);
    const [exerciseIndex, setExerciseIndex] = useState(0);

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(countDownAudio);
        setCountDownSound(sound);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsAudioPlaying(false);
          }
        });
        await sound.playAsync();
        setIsAudioPlaying(true);
      }

      const getExercisesByIntensity = async (intensity) => {
        const folderPath = `${intensity}Exercises`;
        const storageRef = ref(storage, folderPath);

        try{
            const matchingExercises = []
            listAll(storageRef).then((res) => {
                res.items.forEach((item) => {
                    const fileName = item.name.split("/").pop();
                    const matchingExercise = exerciseData.find((exercise) => exercise.gif_url === fileName);
                    if (matchingExercise){
                        matchingExercises.push(matchingExercise)
                    }
                });
            setExercises(matchingExercises);
            });
        } catch (error) {
            console.log(error);
        }
      };

      useEffect(() => {
        getExercisesByIntensity(intensity);
      }, []);

      const fetchGifUrl = async (exercise) => {
        try{
            const storageRef = ref(storage, `${intensity}Exercises/${exercise.gif_url}`);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch(error){
            console.log(error);
            return null
        }
    };

    useEffect(() => {
        const fetchGifUrlsForExercises = async () => {
          const exerciseWithGirlUrl = await Promise.all(
            exercises.map(async (exercise) => {
              const gifUrl = await fetchGifUrl(exercise);
              return {
                ...exercise,
                gif_url: gifUrl,
              };
            })
          );
          setCategoryExercise(exerciseWithGirlUrl);
        };
        fetchGifUrlsForExercises();
      }, [exercises]);

      const handleDecreaseTime = () => {
        if(!isRunning && time>minTime){
            setTime((prevTime) => prevTime-10)
        }
    };

    const handleIncreaseTime = () => {
        if(!isRunning){
            setTime((prevTime) => prevTime+10);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsFirstTime(true);
        setTime(initTime);
        if (countDownSound && isAudioPlaying) {
            countDownSound.stopAsync();
            setIsAudioPlaying(false);
        }
    };

    useEffect(() => {
        let countdownInterval;
        if(isRunning && time>0){
            countdownInterval = setInterval(() => {
                setTime((prevTime) => prevTime-1);
                if (time === 4) {
                    // console.log("time is 4");
                    playSound();
                }
            }, 
            1000)
        } else {
            setIsRunning(false);
            clearInterval(countdownInterval)
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [isRunning, time]);

    const handleStart = () => {
        if(!isRunning && isFirstTime){
            setIsFirstTime(false);
            setIsRunning(true)
        }
        else {
            setIsRunning(true);
        }
    };

    const handlePause = () => {
        if(isRunning){
            setIsRunning(false);
        }
    };

      const currentExercise = categoryExercise[exerciseIndex];

      const navigateToNextExercise = () => {
        if (exerciseIndex < categoryExercise.length - 1) {
          setExerciseIndex(exerciseIndex + 1);
        }
      };
    
      const navigateToPreviousExercise = () => {
        if (exerciseIndex > 0) {
          setExerciseIndex(exerciseIndex - 1);
        }
      };

    
  return (
    <View className=" flex-1">
      {currentExercise? (
        <>
            <Image source={{uri: currentExercise?.gif_url}} className=" w-full h-80"/>
            <BackButton/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className=" mt-4 mx-3">
                    <Text className=" text-2xl font-bold text-center mb-1">{currentExercise?.title}</Text>
                    <View className=" flex-row items-center text-center mx-auto">
                        {currentExercise?.category.split(",").map((cat, index) => (
                            <View key={index} className=" mr-2">
                                <View className=" bg-gray-300 px-2 rounded-2xl pb-1">
                                    <Text className=" text-fuchsia-500">#{cat}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="flex-row items-center space-x-2 mt-2 mx-auto">
                    <Text className="font-semibold  text-blue-500">Intensity:</Text>
                    <Text className="text-cyan-400 text-base">
                        {currentExercise?.intensity}
                    </Text>
                    </View>
                    <Text className="text-xl font-semibold mt-4">Instructions:</Text>
                    <View className=" mt-2">
                        {currentExercise?.instructions.map((instruction) => (
                            <View key={instruction.step} className=" flex-row items-center mb-2">
                                <Text className=" text-base text-gray-600">{instruction.step}</Text>
                                <Text className=" ml-2 text-base">{instruction.text}.</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="mt-4 flex-row items-center justify-center space-x-3">
                    <TouchableOpacity
                        onPress={handleDecreaseTime}
                        className="items-center justify-center w-14 h-14 bg-red-500 rounded-full"
                    >
                        <Text className="text-white text-5xl">-</Text>
                    </TouchableOpacity>
                    <Text>{time} sec</Text>
                    <TouchableOpacity
                        className="items-center justify-center w-14 h-14 bg-green-500 rounded-full"
                        onPress={handleIncreaseTime}
                    >
                        <Text className="text-white text-3xl">+</Text>
                    </TouchableOpacity>
                </View>
                <View className="mt-4 flex-row items-center justify-center mb-10 space-x-4">
                <TouchableOpacity
                    onPress={navigateToPreviousExercise}
                    disabled={exerciseIndex === 0}
                    className={` ${exerciseIndex === 0 ? "opacity-50" : ""}`}
                >
                    <AntDesign name="leftcircleo" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={isRunning ? handlePause : handleStart}
                    disabled={time === 0}
                >
                    <Text
                    className={`text-blue-500 text-xl py-2 border rounded-lg border-blue-500 px-4 ${
                        time === 0 ? "opacity-50" : ""
                    }`}
                    >
                    {isRunning ? "PAUSE" : "START"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReset}>
                    <Text className="text-gray-500 text-xl py-2 border rounded-lg border-gray-500 px-4">
                    RESET
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={navigateToNextExercise}
                    disabled={exerciseIndex === categoryExercise.length - 1}
                    className={` ${
                    exerciseIndex === categoryExercise.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                >
                    <AntDesign name="rightcircleo" size={35} color="black" />
                </TouchableOpacity>
                </View>
            </ScrollView>
        </>
        ) : (
        <View className=" items-center justify-center w-full h-80">
            <ActivityIndicator size={"large"} color={"gray"}/>
        </View>
      )}
    </View>
  )
}

export default CategoryExerciseScreen