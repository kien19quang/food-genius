export interface IFeatured {
  id: number;
  title: string;
  description: string;
  restaurent: IRestaurant[];
}

export interface IRestaurant {
  id: number;
  name: string;
  image: any;
  description: string;
  lng: number;
  lat: number;
  address: string;
  stars: number;
  reviews: string;
  category: string;
  dishes: IDish[];
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
}
