import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WorkoutScreen from './src/Screens/WorkoutScreen';
import CalculationScreen from './src/Screens/CalculationScreen';
import TimerScreen from './src/Screens/TimerScreen';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ExerciseScreen from './src/Screens/ExerciseScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  function TabNavigator(){
    return(
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({color, size}) => {
            let iconName;
            switch(route.name){
              case "Workout":
              iconName= "dumbbell";
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;

              case "Timer":
              iconName= "timer-outline";
              return <Ionicons name={iconName} size={size} color={color} />;

              case "Calculation":
              iconName= "calculator-outline";
              return <Ionicons name={iconName} size={size} color={color} />;

            }
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle:{
            backgroundColor:"black",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 5,
          },
          tabBarActiveTintColor: "aqua",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name='Workout' component={WorkoutScreen}/>
        <Tab.Screen name='Timer' component={TimerScreen}/>
        <Tab.Screen name='Calculation' component={CalculationScreen}/>
      </Tab.Navigator>
    )
  };


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
        }}
      >
        <Stack.Screen name='TabNav' component={TabNavigator}/>
        <Stack.Screen name='Exercise' component={ExerciseScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

