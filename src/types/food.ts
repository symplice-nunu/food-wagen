interface FoodApiRestaurant {
  name?: string;
  logo?: string;
  status?: string;
}

export interface FoodApiResponse {
  id: string;
  name: string;
  avatar?: string;
  image?: string;
  rating?: number | string;
  Price?: string;
  open?: boolean;
  status?: string;
  logo?: string;
  restaurant?: string | FoodApiRestaurant;
  restaurantName?: string;
  createdAt?: string;
}

export type RestaurantStatus = "Open" | "Closed";

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  price?: string;
  restaurantName?: string;
  restaurantLogo?: string;
  restaurantStatus?: RestaurantStatus;
  createdAt?: string;
}

export interface FoodFormValues {
  food_name: string;
  food_rating: string;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: RestaurantStatus;
}

export type FoodFormField =
  | "food_name"
  | "food_rating"
  | "food_image"
  | "restaurant_name"
  | "restaurant_logo"
  | "restaurant_status";

export type FoodFormErrors = Partial<Record<FoodFormField, string>>;
