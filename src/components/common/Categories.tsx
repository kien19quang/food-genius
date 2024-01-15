import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { categories } from "../../constants"
import { useState } from "react"

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  return (
    <View className='mt-4'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='overflow-visible'
        contentContainerStyle={{ paddingHorizontal: 1.5 }}
      >
        {categories.map((item, index) => {
          const isActive = item.id === activeCategory;
          const btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
          const textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
          return (
            <View key={index} className='flex justify-center items-center mr-6'> 
              <TouchableOpacity
                onPress={() => setActiveCategory(item.id)}
                className={`p-1 rounded-full shadow bg-gray-200 ${btnClass}`}
              >
                <Image style={{ width: 45, height: 45 }} source={item.image} />
              </TouchableOpacity>

              <Text className={`text-sm ${textClass}`}>{item.name}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Categories