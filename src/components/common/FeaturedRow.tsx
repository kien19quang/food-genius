import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { themeColors } from "../../theme";
import RestaurantCard from "./RestaurantCard";
import { IRestaurant } from "../../interfaces/common";

export interface FeaturedRowProps {
  title: string;
  restaurants: IRestaurant[];
  description: string;
}

const FeaturedRow = ({ title, restaurants, description }: FeaturedRowProps) => {
  return (
    <View>
      <View className='flex-row justify-between items-center px-4'>
        <View>
          <Text className='font-bold text-lg'>{title}</Text>
          <Text className='text-gray-500 text-xs'>{description}</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className='font-semibold'>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{  paddingHorizontal: 15 }}
        className='overflow-visible py-5'
      >
        {restaurants.map((restaurant, index) => {
          return (
            <RestaurantCard key={index} item={restaurant} />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow