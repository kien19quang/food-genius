import { Image, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Marker } from "react-native-maps"
import { themeColors } from "../theme"
import { Phone, X } from "react-native-feather"
import { selectRestaurant } from "../redux/slices/restaurantSlice"
import { useDispatch, useSelector } from "react-redux"
import { emptyCart } from "../redux/slices/cartSlice"
import { useEffect, useState } from "react"
import * as Location from 'expo-location'
import { calculateDistance } from "../utils"

const DeliveryScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<any>({});

  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    // Lấy vị trí hiện tại của thiết bị
    handleGetCurrentPosition()
  }, []);

  const handleGetCurrentPosition = async () => {
    // try {
    //   const { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     console.log('Permission to access location was denied');
    //     return;
    //   }

    //   const location = await Location.getCurrentPositionAsync({});
    //   console.log(location)
    //   const distance = calculateDistance(20.9933289, 105.7869775, Number(restaurant.lng), Number(restaurant.lat))
    //   console.log(distance)

    //   setCurrentLocation(location.coords);
    // } catch(e) {
    //   console.log(e)
    // }
  }

  const cancelOrder = () => {
    navigation.navigate('Home')
    dispatch(emptyCart())
  }

  return (
    <View className='flex-1'>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType='standard'
      >
        {/* <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Your Location"
          pinColor="blue"
        /> */}

        <Marker 
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>

      <View className='rounded-t-3xl -mt-12 bg-white relative'>
        <View className='flex-row justify-between px-5 pt-10'>
          <View>
            <Text className='text-lg text-gray-700 font-semibold'>
              Estimated Arrival
            </Text>
            <Text className='text-3xl font-extrabold text-gray-700'>
              20-30 Minutes
            </Text>
            <Text className='mt-2 text-gray-700 font-semibold'>
              Your order is own its way!
            </Text>
          </View>
          <Image className='w-24 h-24' source={require('../../assets/images/bikeGuy2.gif')} />
        </View>
        
        <View 
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
          className='p-2 flex-row justify-between items-center rounded-full my-5 mx-2'
        >
          <View className="p-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
            <Image className="h-16 w-16 rounded-full" source={require('../../assets/images/deliveryGuy.png')} />
          </View>
          
          <View className='flex-1 ml-3'>
            <Text className='text-lg font-bold text-white'>
              Quang Kiên
            </Text>
            <Text className='font-semibold text-white'>
              Your Rider
            </Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className='bg-white p-2 rounded-full'>
              <Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth={1} />
            </TouchableOpacity>
            <TouchableOpacity className='bg-white p-2 rounded-full' onPress={cancelOrder}>
              <X stroke='red' strokeWidth={4} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DeliveryScreen