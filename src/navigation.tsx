import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import OrderPrepairingScreen from "./screens/OrderPrepairingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Loading from "./components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setIsLoggedIn, setLoading } from "./redux/slices/commonSlice";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const Stack = createNativeStackNavigator()

export default function Navigation() {
  const loading = useSelector((state: RootState) => state.common.loading)
  const isLoggedIn = useSelector((state: RootState) => state.common.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    handleCheckLoggedIn()
  }, [])

  const handleCheckLoggedIn = async () => {
    dispatch(setLoading(true))
    const accessToken = await AsyncStorage.getItem('accessToken')
    dispatch(setLoading(false))
    if (accessToken) {
      dispatch(setIsLoggedIn(true))
    }
  }

  if (loading) {
    return <Loading />
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="OrderPrepairing" component={OrderPrepairingScreen} options={{ presentation: 'fullScreenModal' }} />
            <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ presentation: 'fullScreenModal' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}