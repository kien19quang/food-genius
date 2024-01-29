import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { themeColors } from "../theme"
import { useEffect, useState } from "react"
import axios from "axios"

const EmptyScreen = () => {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [sum, setSum] = useState('')

  const handeCalcSum = () => {
    setSum(String(Number(number1) + Number(number2)))
  }

  return (
    <SafeAreaView className='gap-2'>
      <TextInput placeholder="Restaurants" className='h-9 p-2 border m-2' value={number1} inputMode='numeric' onChangeText={value => setNumber1(value)} />

      <TextInput placeholder="Restaurants" className='h-9 p-2 border m-2' value={number2} inputMode='numeric' onChangeText={value => setNumber2(value)} />

      <TouchableOpacity
        onPress={handeCalcSum}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className='flex-row justify-center items-center rounded-full p-4 shadow-lg'
      >
        <Text className='text-sm'>Tính</Text>
      </TouchableOpacity>

      <View className='justify-center'>
        <Text>{sum}</Text>
      </View>
    </SafeAreaView>   
  )
}

export default EmptyScreen