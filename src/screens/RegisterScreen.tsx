import react, { useState } from 'react';
import { Alert, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'react-native-feather';
import { RegisterDto } from '../interfaces/common';
import AuthService from '../services/AuthService';

export default function RegisterScreen () {
  const navigation = useNavigation()
  const [registerData, setRegisterData] = useState<RegisterDto>({
    name: '',
    password: '',
    email: '',
    phoneNumber: ''
  })

  const handleFinish = async () => {
    const { name, password, email, phoneNumber } = registerData
    if (!name || !password || !email || !phoneNumber) {
      return Alert.alert('Vui lòng điền đầy đủ thông tin')
    }

    const response = await AuthService.registerCustomer(registerData)
    if (response?.error) {
      return Alert.alert(response.error)
    }

    if (response) {
      Alert.alert('Tạo tài khoản thành công. Vui lòng đăng nhập')
      navigation.navigate('Login')
    }
  }

  return (
    <View className='flex-1 bg-white' style={{ backgroundColor: '#6f57eb' }}>
      <SafeAreaView className='flex'>
        <View className='flex-row justify-start'>
          <TouchableOpacity className='bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4' onPress={() => navigation.navigate('Welcome')}>
            <ArrowLeft height={20} width={20} color='black' />
          </TouchableOpacity>
        </View>

        <View className='flex-row justify-center'>
          <Image source={require('../../assets/images/bg_login.jpeg')} className='rounded-full' style={{ width: 200, height: 200 }} />
        </View>
      </SafeAreaView>

      <View className='flex-1 bg-white px-8 pt-8' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className='form space-y-2'>
          <Text className='text-gray-700 ml-4'>Họ và tên</Text>

          <TextInput 
            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3' 
            placeholder='Nhập họ và tên' 
            value={registerData.name} 
            onChangeText={value => setRegisterData({ ...registerData, name: value })} 
          />

          <Text className='text-gray-700 ml-4'>Email</Text>

          <TextInput 
            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3' 
            placeholder='Nhập email' 
            keyboardType='email-address' 
            value={registerData.email} 
            onChangeText={value => setRegisterData({ ...registerData, email: value })} 
          />

          <Text className='text-gray-700 ml-4'>Mật khẩu</Text>

          <TextInput 
            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3' 
            placeholder='Nhập mật khẩu' 
            secureTextEntry 
            value={registerData.password} 
            onChangeText={value => setRegisterData({ ...registerData, password: value })} 
          />

          <Text className='text-gray-700 ml-4'>Số điện thoại</Text>

          <TextInput 
            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-6' 
            placeholder='Nhập số điện thoại' 
            value={registerData.phoneNumber} 
            onChangeText={value => setRegisterData({ ...registerData, phoneNumber: value })} 
          />

          <TouchableOpacity className='py-3 bg-yellow-400 rounded-xl mb-4' onPress={handleFinish}>
            <Text className='font-bold text-center text-gray-700'>
              Đăng ký
            </Text>
          </TouchableOpacity>

          <View className='flex-row justify-center gap-1'>
            <Text className='text-gray-500 font-semibold'>Bạn đã có tài khoản?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className='font-semibold text-yellow-500'>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
