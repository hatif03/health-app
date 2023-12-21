import { View, Text } from 'react-native'
import React from 'react'
import {
    useFonts,
    Caveat_600SemiBold,
  } from '@expo-google-fonts/caveat'

const Welcome = () => {

    let [fontsLoaded] = useFonts({
        Caveat_600SemiBold,
      });
    if(!fontsLoaded){
        return null;
    }

  return (
    <View>
      <Text
        style={{
            fontFamily: "Caveat_600SemiBold",
            fontSize: 35,
            textAlign: "center",
            color: "#92400e"
        }}
      >
        Welcome
      </Text>
    </View>
  )
}

export default Welcome