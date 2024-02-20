export interface ICategory {
  _id: string;
  title: string;
  description: string;
  image: string;
}
export interface IRestaurant {
  _id: string;
  name: string;
  image: string;
  description: string;
  lng: number;
  lat: number;
  address: string;
  stars: number;
  reviews: number
  updatedAt: Date;
  createdAt: Date;
  categories: ICategory[]
  dishes: IDish[]
}

export interface IDish {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IFeatured {
  _id: string;
  title: string;
  description: string;
  restaurants: IRestaurant[];
  isVisible: boolean;
  order: number;
}

export interface FeaturedDto {
  title: string;
  description: string;
  isVisible: boolean;
  restaurantIds: string[]
}

export interface LoginDto {
  email: string;
  password: string
}

export interface RegisterDto {
  email: string;
  password: string;
  phoneNumber: string;
  name: string
}

export interface OrderDto {
  price: number;
  isPaid: boolean;
  isShipped: boolean;
  restaurantId: string;
}