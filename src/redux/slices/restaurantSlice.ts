import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRestaurant } from "../../interfaces/common";
import { RootState } from "../store";

export interface RestaurantState {
  restaurant: IRestaurant
}

const initialState: RestaurantState = {
  restaurant: {
    id: 0,
    name: "",
    image: undefined,
    description: "",
    lng: 0,
    lat: 0,
    address: "",
    stars: 0,
    reviews: "",
    category: "",
    dishes: []
  }
}


export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<IRestaurant>) => {
      state.restaurant = action.payload
    }
  }
})

export const selectRestaurant = (state: RootState) => state.restaurant.restaurant

export const { setRestaurant } = restaurantSlice.actions

export default restaurantSlice.reducer