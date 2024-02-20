import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { featured } from "../constants"
import { themeColors } from "../theme"
import { ArrowLeft, Minus } from "react-native-feather"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { selectRestaurant } from "../redux/slices/restaurantSlice"
import { removeFromCart, selectCartItems, selectCartTotal } from "../redux/slices/cartSlice"
import { useEffect, useState } from "react"
import { groupBy } from "lodash"
import { IDish } from "../interfaces/common"
import PaymentService from "../services/PaymentService"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native"
import OrderService from "../services/OrderService"

const CartScreen = () => {
  const [groupItems, setGroupItems] = useState<Record<string, IDish[]>>({})

  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  const deliveryFee = 2

  useEffect(() => {
    const newGroupItems = groupBy(cartItems, 'id');
    setGroupItems(newGroupItems)
  }, [cartItems])

  const handleOrder = async () => {
    const response = await PaymentService.createPaymentIntents(deliveryFee + cartTotal)
    if (response?.paymentIntent) {
      const currentUrl = await Linking.getInitialURL() as string
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: response.paymentIntent,
        defaultBillingDetails: {
          name: 'Quang Kiên',
        },
        returnURL: currentUrl
      })

      if (initResponse.error) {
        console.log(initResponse.error)
        Alert.alert('Lỗi không khởi tạo được sheet')
        return
      }

      const paymentResponse = await presentPaymentSheet()

      if (paymentResponse.error) {
        if (paymentResponse.error.code === 'Canceled') {
          await PaymentService.deleteTransaction(response.id)
        }
        else {
          Alert.alert(`Lỗi: ${paymentResponse.error.code}`, paymentResponse.error.message)
        }
        return
      }

      const createOrder = await OrderService.createOrder({
        price: deliveryFee + cartTotal,
        isPaid: true,
        isShipped: false,
        restaurantId: restaurant._id,
      })

      if (createOrder) {
        navigation.navigate('OrderPrepairing')
      }
    }
  }

  return (
    <View className="bg-white flex-1">
      <View className='relative py-4 shadow-sm'>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className='absolute z-10 rounded-full p-1 shadow top-5 left-2'
        >
          <ArrowLeft strokeWidth={3} stroke='white' />
        </TouchableOpacity>

        <View>
          <Text className='text-center font-bold text-xl'>Your cart</Text>
          <Text className='text-center text-gray-500'>{restaurant.name}</Text>
        </View>
      </View>

      <View
        style={{  backgroundColor: themeColors.bgColor(0.2) }}
        className='flex-row px-4 items-center'
      >
        <Image source={require('../../assets/images/bikeGuy.png')} className='w-20 h-20 rounded-full' />
        <Text className='flex-1 pl-4'>Deliver in 20-30 minutes</Text>

        <TouchableOpacity>
          <Text className='font-bold' style={{ color: themeColors.text }}>Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='bg-white pt-5'
      >
        {Object.entries(groupItems).map(([key, items]) => {
          const dish = items[0]
          return (
            <View key={key} className='flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md'>
              <Text className='font-bold' style={{ color: themeColors.text }}>
                {items.length} x
              </Text>
              <Image className="h-14 w-14 rounded-full" source={{ uri: dish.image }} />
              <Text className='flex-1 font-bold text-gray-700'>{dish.name}</Text>
              <Text className='font-semibold text-base'>${dish.price}</Text>
              <TouchableOpacity
                className='p-1 rounded-full'
                onPress={() => dispatch(removeFromCart(dish))}
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Minus strokeWidth={4} height={20} width={20} stroke='white' />
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>

      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="p-6 px-8 rounded-t-3xl space-y-4">
        <View className='flex-row justify-between'>
          <Text className='text-gray-700'>Subtotal</Text>
          <Text className='text-gray-700'>${cartTotal}</Text>
        </View>

        <View className='flex-row justify-between'>
          <Text className='text-gray-700'>Delivery Fee</Text>
          <Text className='text-gray-700'>${deliveryFee}</Text>
        </View>

        <View className='flex-row justify-between'>
          <Text className='text-gray-700 font-extrabold'>Order Total</Text>
          <Text className='text-gray-700 font-extrabold'>${deliveryFee + cartTotal}</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleOrder}
            style={{ backgroundColor: cartTotal > 0 ? themeColors.bgColor(1) : themeColors.bgDisable }}
            className='p-3 rounded-full'
            disabled={cartTotal === 0}
          >
            <Text className='text-white text-center font-bold text-lg'>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CartScreen