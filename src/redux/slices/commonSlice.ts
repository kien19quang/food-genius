import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IDish, IRestaurant } from "../../interfaces/common";
import { RootState } from "../store";
import { memoize } from "lodash";

export interface CommonState {
  loading: boolean,
  isLoggedIn: boolean
}

const initialState: CommonState = {
  loading: false,
  isLoggedIn: false
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
  }
})

export const { setLoading, setIsLoggedIn } = commonSlice.actions
export default commonSlice.reducer