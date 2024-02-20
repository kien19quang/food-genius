import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import { MapPin } from "react-native-feather"
import { themeColors } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { IRestaurant } from "../../interfaces/common"

export interface RestaurantCardProps {
  item: IRestaurant
}

const RestaurantCard = ({ item }: RestaurantCardProps) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Restaurant', { ...item })}
    >
      <View 
        style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }}
        className='mr-6 bg-white rounded-3xl shadow-lg w-64'
      >
        <Image className='h-36 w-full rounded-t-3xl' source={{ uri: item.image }} />

        <View className='px-3 pb-4 space-y-2'>
          <Text className='text-lg font-bold pt-2'>{item.name}</Text>

          <View className='flex-row items-center space-x-1'>
            <Image source={require('../../../assets/images/fullStar.png')} className='h-4 w-4' /> 
            <Text className='text-xs' numberOfLines={1}>
              <Text className='text-green-700'>{item.stars}&nbsp;</Text>
              <Text className='text-gray-700'>
                ({item.reviews} reviews) · <Text className="font-semibold text-gray-700">{item?.categories?.map(item => item.title).join(', ')}</Text>
              </Text>
            </Text>
          </View>

          <View className='flex-row items-center space-x-1'>
            <MapPin color='gray' width={15} height={15} />
            <Text className='text-gray-700 text-xs' numberOfLines={1}>Nearby· {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RestaurantCard