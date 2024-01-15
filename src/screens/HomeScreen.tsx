import { ScrollView, StatusBar, Text, TextInput, View } from "react-native";
import { MapPin, Search, Sliders } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import Categories from "../components/common/Categories";
import { featured } from "../constants";
import FeaturedRow from "../components/common/FeaturedRow";

export interface HomeScreenProps {
}

export default function HomeScreen (props: HomeScreenProps) {
  return (
    <SafeAreaView className="bg-white">
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

        <View style={{ backgroundColor: themeColors.bgColor(1) }} className='p-3 rounded-full'>
          <Sliders height={20} width={20} strokeWidth={2.5} stroke='white' />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Categories />

        <View className='mt-5'>
          {
            [featured, featured, featured].map((item, index) => {
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
