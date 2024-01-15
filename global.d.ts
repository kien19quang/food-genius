/// <reference types="nativewind/types" />

import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { IRestaurant } from "./src/interfaces/common";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase {
      Home: any;
      Restaurant: IRestaurant;
      Cart: any;
    }
  }
}

// export function useNavigation<T extends NavigationProp>(): T;
