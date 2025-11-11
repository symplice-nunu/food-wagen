import { FoodApiResponse, FoodFormValues, FoodItem } from "@/types/food";

const API_ROOT = "https://6852821e0594059b23cdd834.mockapi.io/Food";

const toRestaurantStatus = (open?: boolean, status?: string) => {
  if (status === "Open" || status === "Closed") {
    return status;
  }
  if (typeof open === "boolean") {
    return open ? "Open" : "Closed";
  }
  if (status?.toLowerCase() === "open") {
    return "Open";
  }
  if (status?.toLowerCase() === "closed") {
    return "Closed";
  }
  return undefined;
};

const isRestaurantObject = (
  restaurant: FoodApiResponse["restaurant"],
): restaurant is NonNullable<Exclude<FoodApiResponse["restaurant"], string>> =>
  typeof restaurant === "object" && restaurant !== null;

const normalizeFood = (food: FoodApiResponse): FoodItem => {
  const image = food.image ?? food.avatar ?? "";
  const ratingNumber =
    typeof food.rating === "string"
      ? Number.parseFloat(food.rating)
      : food.rating ?? 0;
  const restaurant = isRestaurantObject(food.restaurant)
    ? food.restaurant
    : undefined;

  const rawId = food.id ?? "";
  const normalizedId =
    typeof rawId === "string" ? rawId.trim() : String(rawId).trim();

  return {
    id: normalizedId,
    name: food.name ?? "Untitled food",
    image:
      image ||
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    rating: Number.isFinite(ratingNumber) && ratingNumber > 0 ? ratingNumber : 0,
    price: food.Price,
    restaurantName:
      food.restaurantName ??
      (typeof food.restaurant === "string" ? food.restaurant : restaurant?.name),
    restaurantLogo: food.logo ?? restaurant?.logo,
    restaurantStatus: toRestaurantStatus(food.open, food.status ?? restaurant?.status),
    createdAt: food.createdAt,
  };
};

const serializeFood = (values: FoodFormValues) => ({
  name: values.food_name,
  rating: Number(values.food_rating),
  image: values.food_image,
  logo: values.restaurant_logo,
  restaurantName: values.restaurant_name,
  status: values.restaurant_status,
  open: values.restaurant_status === "Open",
});

export const fetchFoods = async (query?: string): Promise<FoodItem[]> => {
  const url = query?.trim()
    ? `${API_ROOT}?name=${encodeURIComponent(query.trim())}`
    : API_ROOT;

  const response = await fetch(url, { cache: "no-store" });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Failed to load foods");
  }

  const data: FoodApiResponse[] = await response.json();
  return data.map(normalizeFood);
};

export const createFood = async (values: FoodFormValues): Promise<FoodItem> => {
  const response = await fetch(API_ROOT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serializeFood(values)),
  });

  if (!response.ok) {
    throw new Error("Unable to add food");
  }

  const data: FoodApiResponse = await response.json();
  return normalizeFood(data);
};

export const updateFood = async (
  id: string,
  values: FoodFormValues,
): Promise<FoodItem> => {
  const sanitizedId = id.trim();
  if (!sanitizedId) {
    throw new Error("Invalid food identifier");
  }

  const response = await fetch(`${API_ROOT}/${sanitizedId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serializeFood(values)),
  });

  if (!response.ok) {
    throw new Error("Unable to update food");
  }

  const data: FoodApiResponse = await response.json();
  return normalizeFood(data);
};

export const deleteFood = async (id: string): Promise<void> => {
  const sanitizedId = id.trim();
  if (!sanitizedId) {
    throw new Error("Invalid food identifier");
  }

  const response = await fetch(`${API_ROOT}/${sanitizedId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete food");
  }
};
