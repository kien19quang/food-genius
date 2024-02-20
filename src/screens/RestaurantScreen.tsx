import { useNavigation, useRoute } from "@react-navigation/native"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { ArrowLeft, MapPin } from "react-native-feather";
import { themeColors } from "../theme";
import { IRestaurant } from "../interfaces/common";
import DishRow from "../components/common/DishRow";
import CartIcon from "../components/common/CartIcon";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectRestaurant, setRestaurant } from "../redux/slices/restaurantSlice";
import RestaurantService from "../services/RestaurantService";
import { setLoading } from "../redux/slices/commonSlice";

const RestaurantScreen = () => {
  const { params } = useRoute()
  const item = params as IRestaurant;
  const restaurant = useSelector(selectRestaurant)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (item && item._id) {
      handleGetDetailRestaurant()
    }
  }, [item._id])

  const handleGetDetailRestaurant = async () => {
    const restaurant = await RestaurantService.getDetailRestaurant(item._id)
    if (restaurant) {
      dispatch(setRestaurant(restaurant))
    }
  }

  return (
    <View>
      <CartIcon />
      <StatusBar style='light' />
      <ScrollView className="bg-white h-full">
        <View className='relative'>
          <Image className='w-full h-72' source={{ uri: restaurant.image }} />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow'
          >
            <ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>

        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className='bg-white -mt-12 pt-6'
        >
          <View className='px-5'>
            <Text className='text-3xl font-bold'>{restaurant.name}</Text>
            <View className='gap-2 mt-1'>
              <View className='flex-row items-center space-x-1'>
                <Image source={require('../../assets/images/fullStar.png')} className='h-4 w-4' /> 
                <Text className='text-xs' numberOfLines={1}>
                  <Text className='text-green-700'>{restaurant.stars}&nbsp;</Text>
                  <Text className='text-gray-700'>
                    ({restaurant.reviews} reviews) · <Text className="font-semibold text-gray-700">{item?.categories?.map(item => item.title).join(', ')}</Text>
                  </Text>
                </Text>
              </View>

              <View className='flex-row items-center space-x-1'>
                <MapPin color='gray' width={15} height={15} />
                <Text className='text-gray-700 text-xs'>Nearby· {restaurant.address}</Text>
              </View>
            </View>

            <Text className='text-gray-500 mt-2'>{restaurant.description}</Text>
          </View>
        </View>

        <View className='pb-36 bg-white'>
          <Text className='px-4 py-4 text-2xl font-bold'>Menu</Text>
          
          {restaurant.dishes.map((item, index) => {
            return (
              <DishRow key={index} item={item} />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default RestaurantScreen