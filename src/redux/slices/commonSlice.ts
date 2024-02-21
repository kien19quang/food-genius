import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { ICustomer, IDish, IRestaurant } from "../../interfaces/common";
import { RootState } from "../store";
import { memoize } from "lodash";

export interface CommonState {
  loading: boolean,
  isLoggedIn: boolean,
  userInfo: ICustomer
}

const initialState: CommonState = {
  loading: false,
  isLoggedIn: false,
  userInfo: {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
  }
}


export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  }
})

export const { setLoading, setIsLoggedIn, setUserInfo } = commonSlice.actions
export default commonSlice.reducer