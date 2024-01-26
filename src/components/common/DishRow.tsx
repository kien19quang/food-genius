import { Image, Text, TouchableOpacity, View } from "react-native"
import { IDish } from "../../interfaces/common"
import { themeColors } from "../../theme"
import { Minus, Plus } from "react-native-feather"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart, selectCartItems, selectCartItemsById, selectCartTotal } from "../../redux/slices/cartSlice"
import { RootState } from "../../redux/store"

export interface DishRowProps {
  item: IDish
}

const DishRow = ({ item }: DishRowProps) => {
  const dispatch = useDispatch()
  const totalItems = useSelector((state: RootState) => selectCartItemsById(state, item.id))

  const handleIncrease = () => {
    dispatch(addToCart(item))
  }

  const handleDecrease = () => {
    dispatch(removeFromCart(item))
  }

  return (
    <View className='flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2'>
      <Image className='rounded-3xl' style={{ height: 100, width: 100 }} source={item.image} />

      <View className='flex flex-1 space-y-3'>
        <View className='pl-3'>
          <Text className='text-xl'>{item.name}</Text>
          <Text className='text-gray-700'>{item.description}</Text>
        </View>

        <View className='flex-row justify-between pl-3 items-center'>
          <Text className='text-gray-700 text-lg font-bold'>
            ${item.price}
          </Text>

          <View className='flex-row items-center'>
            <TouchableOpacity
              onPress={handleDecrease}
              className='p-1 rounded-full'
              style={{ backgroundColor: themeColors.bgColor(1) }}
              disabled={!totalItems.length}
            >
              <Minus strokeWidth={2} height={20} width={20} stroke='white' />
            </TouchableOpacity>

            <Text className='px-3'>
              {totalItems.length}
            </Text>

            <TouchableOpacity
              onPress={handleIncrease}
              className='p-1 rounded-full'
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Plus strokeWidth={2} height={20} width={20} stroke='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DishRow