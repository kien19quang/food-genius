import { useNavigation, useRoute } from "@react-navigation/native"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { ArrowLeft, MapPin } from "react-native-feather";
import { themeColors } from "../theme";
import { IRestaurant } from "../interfaces/common";
import DishRow from "../components/common/DishRow";
import CartIcon from "../components/common/CartIcon";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRestaurant } from "../redux/slices/restaurantSlice";

const RestaurantScreen = () => {
  const { params } = useRoute()
  const item = params as IRestaurant;
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant(item))
    }
  }, [])

  return (
    <View>
      <CartIcon />
      <StatusBar style='light' />
      <ScrollView>
        <View className='relative'>
          <Image className='w-full h-72' source={item.image} />

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
            <Text className='text-3xl font-bold'>{item.name}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <Image source={require('../../assets/images/fullStar.png')} className='h-4 w-4' /> 
                <Text className='text-xs'>
                  <Text className='text-green-700'>{item.stars}</Text>
                  <Text className='text-gray-700'>
                    ({item.reviews} reviews) · <Text className="font-semibold text-gray-700">{item.category}</Text>
                  </Text>
                </Text>
              </View>

              <View className='flex-row items-center space-x-1'>
                <MapPin color='gray' width={15} height={15} />
                <Text className='text-gray-700 text-xs'>Nearby· {item.address}</Text>
              </View>
            </View>

            <Text className='text-gray-500 mt-2'>{item.description}</Text>
          </View>
        </View>

        <View className='pb-36 bg-white'>
          <Text className='px-4 py-4 text-2xl font-bold'>Menu</Text>
          
          {item.dishes.map((item, index) => {
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