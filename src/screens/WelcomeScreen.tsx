import * as React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen () {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#6f57eb' }}>
      <View className='flex-1 flex justify-around my-4'>
        <Text className='text-white font-bold text-4xl text-center'>
          Bắt đầu nào
        </Text>

        <View className='flex-row justify-center'>
          <Image source={require('../../assets/images/bg_login.jpeg')} className='rounded-full' style={{ width: 200, height: 200 }} />
        </View>

        <View className='space-y-4'>
          <TouchableOpacity className='py-3 bg-yellow-400 mx-7 rounded-xl' onPress={() => navigation.navigate('Login')}>
            <Text className='text-xl font-bold text-center text-gray-700'>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <View className='flex-row justify-center gap-1'>
            <Text className='text-white font-semibold'>
              Bạn là người mới?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className='font-semibold text-yellow-400'>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
