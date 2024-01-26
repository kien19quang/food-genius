import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IDish, IRestaurant } from "../../interfaces/common";
import { RootState } from "../store";
import { memoize } from "lodash";

export interface CartState {
  items: IDish[]
}

const initialState: CartState = {
  items: []
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (state, action) => {
      let cart = [...state.items];
      const itemIndex = state.items.findIndex(item=> item.id === action.payload.id);
      if(itemIndex>=0){
        cart.splice(itemIndex, 1);
      }else{
        console.log("can't remove item as its not in the basket");
      }
      state.items = cart
    },
    emptyCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartItemsById = (state: RootState, id: number) => state.cart.items.filter((item) => item.id === id)

export const selectCartTotal = (state: RootState) => state.cart.items.reduce((total, item) => total = total + item.price, 0)

export default cartSlice.reducer