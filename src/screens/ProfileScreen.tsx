import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../redux/slices/commonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../redux/store';
import { ArrowLeft } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';


export default function ProfileScreen () {
  const userInfo = useSelector((state: RootState) => state.common.userInfo)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('userInfo')
    dispatch(setIsLoggedIn(false))
  }

  return (
    <View className='flex-1 gap-8' style={{ backgroundColor: themeColors.bgColor(1) }}>
      <SafeAreaView>
        <View className='flex-row justify-start'>
          <TouchableOpacity className='bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4' onPress={() => navigation.navigate('Home')}>
            <ArrowLeft height={20} width={20} color='black' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className='items-center gap-5 h-full -mt-9'>
        <Image source={require('../../assets/images/bg_login.jpeg')} style={{ width: 200, height: 200 }} className='rounded-full' />

        <View className='items-center gap-1'>
          <Text className='text-lg font-semibold text-white'>{userInfo.name}</Text>
          <View className='gap-1 flex-row'>
            <Text className='text-base text-white font-semibold'>Email:</Text>
            <Text className='text-base text-white'>{userInfo.email}</Text>
          </View>
          <View className='gap-1 flex-row'>
            <Text className='text-base text-white font-semibold'>Số điện thoại:</Text>
            <Text className='text-base text-white'>{userInfo.phoneNumber}</Text>
          </View>
        </View>

        <View className='justify-center items-center'>
          <TouchableOpacity className='p-3 bg-red-400 rounded-xl' onPress={handleLogout}>
            <Text className='font-bold text-center text-white'>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
