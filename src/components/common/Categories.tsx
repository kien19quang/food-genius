import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { categories } from "../../constants"
import { useEffect, useState } from "react"
import { ICategory } from "../../interfaces/common"
import CategoryRepository from "../../services/repositories/CategoryRepository"

const handleBtnActive = (isActive: boolean) => isActive ? 'bg-gray-600' : 'bg-gray-200';
const handleTextActive = (isActive: boolean) => isActive ? 'font-semibold text-gray-800' : 'text-gray-500'

const Categories = () => {
  const [listCategory, setListCategory] = useState<ICategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    fetchListCategory()
  }, [])

  const fetchListCategory = async () => {
    const categories = await CategoryRepository.getListCategory()
    setListCategory(categories)
  }

  return (
    <View className='mt-4'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='overflow-visible'
        contentContainerStyle={{ paddingHorizontal: 1.5 }}
      >
        <View className='flex justify-center items-center w-[85px]'> 
          <TouchableOpacity
            onPress={() => setActiveCategory('all')}
            className={`p-1 rounded-full shadow bg-gray-200 ${handleBtnActive(activeCategory === 'all')}`}
          >
            <Image className='rounded-full' style={{ width: 45, height: 45 }} source={require('../../../assets/images/category-all.jpeg')} />
          </TouchableOpacity>

          <Text className={`text-sm ${handleTextActive(activeCategory === 'all')}`}>Tất cả</Text>
        </View>
        {listCategory.map((item, index) => {
          const isActive = item._id === activeCategory;
          const btnClass = handleBtnActive(isActive)
          const textClass = handleTextActive(isActive)
          return (
            <View key={index} className='flex justify-center items-center w-[85px]'> 
              <TouchableOpacity
                onPress={() => setActiveCategory(item._id)}
                className={`p-1 rounded-full shadow bg-gray-200 ${btnClass}`}
              >
                <Image className='rounded-full' style={{ width: 45, height: 45 }} source={{ uri: item.image }} />
              </TouchableOpacity>

              <Text className={`text-sm ${textClass}`}>{item.title}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Categories