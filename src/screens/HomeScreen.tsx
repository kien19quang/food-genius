import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MapPin, Search, Settings, Sliders } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import Categories from "../components/common/Categories";
import { featured } from "../constants";
import FeaturedRow from "../components/common/FeaturedRow";
import { useEffect, useState } from "react";
import { IFeatured } from "../interfaces/common";
import RestaurantService from "../services/RestaurantService";
import { useNavigation } from "@react-navigation/native";

export interface HomeScreenProps {
}

export default function HomeScreen (props: HomeScreenProps) {
  const navigation = useNavigation()
  const [listFeatured, setListFeatured] = useState<IFeatured[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    handleGetListFeatured()
  }, [activeCategory])

  const handleGetListFeatured = async () => {
    const response = await RestaurantService.getListFeatured(activeCategory)
    if (response) {
      setListFeatured(response)
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" keyboardType='default' />
          <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
            <MapPin height='20' width='20' stroke='gray' />
            <Text className='text-gray-600'>Viet Nam, VN</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={{ backgroundColor: themeColors.bgColor(1) }} className='p-3 rounded-full'>
            <Settings height={20} width={20} strokeWidth={2.5} stroke='white' />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Categories activeCategory={activeCategory} setActiveCategory={(key: string) => setActiveCategory(key)} />

        <View className='mt-5'>
          {
            listFeatured.map((item, index) => {
              return (
                <FeaturedRow 
                  key={index}
                  title={item.title}
                  description={item.description}
                  restaurants={item.restaurants}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
