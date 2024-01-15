import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { themeColors } from "../theme"
import { useEffect, useState } from "react"
import axios from "axios"

const EmptyScreen = () => {
  const [listPage, setListPage] = useState<any[]>([])

  const fetchListPage = async () => {
    const response =  await axios({
      method: 'GET',
      url: 'https://graph.facebook.com/me/accounts?fields=name,picture,tasks,access_token&access_token=EAAOBv9ksIawBOx9MyL0iBc7eIAZBft0PNorQk9X124KVnOXZCUg2FLOS0Qxipkbiqj5Xb3lC093Y5yJjPNg60xlhCWN97lsKZASSmIYddTgclHWEZBLN390SngvMkFrTOPhleHYm3MsXZBFrCky3lPAZC3RP5VVdMlGXgguXHJfrJDr49bNrEDzzfr8aYkt1aTZChGYeCRJMG8OzRlV6EM8rsFyRSxR7y45LHSkUldAwxqgmm1gpE91'
    })
    if (response.data?.data) {
      setListPage(response.data?.data)
    }
  }

  return (
    <SafeAreaView className='gap-2'>
      <TouchableOpacity
        onPress={fetchListPage}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className='flex-row justify-between items-center rounded-full p-4 shadow-lg'
      >
        <Text className='font-extrabold text-white text-lg'>Call Api</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {listPage.map(page => {
          return (
            <View className='flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2' key={page.id}>
              <Image className='rounded-3xl' style={{ height: 100, width: 100 }} src={page.picture.data.url} />

              <View className='flex flex-1 space-y-3'>
                <View className='pl-3'>
                  <Text className='text-xl'>{page.name}</Text>
                  <Text className='text-gray-700'>{page.id}</Text>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>   
  )
}

export default EmptyScreen