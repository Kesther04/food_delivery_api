import { Restaurant } from "../models/Restaurant.js";
import { Dish } from "../models/Dish.js";

// Service for creating restaurants 
export async function createRestaurant(data) {
  const restaurant = await Restaurant.create(data);
  return restaurant;
}

// Service for creating or updating dishes for a restaurant
export async function addOrUpdateDish(restaurantId, dishData) {
  // ensure restaurant exists
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) throw new Error("Restaurant not found");

  const filter = { restaurantId, name:dishData.name};

  // create or update dish document
  const dish = await Dish.findOneAndUpdate(
    filter,
    { $set: { ...dishData, updatedAt: new Date() }, $inc: { version: 1 } },
    { upsert: true, new: true }
  );
  return dish;
}

// Service for getting specific dish 
export async function readDish(dishId){
  const dish = await Dish.findById(dishId).lean();
  if (!dish) throw new Error("Dish not Found");
  const { restaurantId } = dish;
  
  // to get restaurant data of dish
  const restaurant = await Restaurant.findById(restaurantId).lean().select("-description");
  
  restaurant.restaurantName = restaurant.name;
  delete restaurant.name;
  delete restaurant._id;
  return {...dish, ...restaurant};
}

// Service for fetching restaurant details along with its dishes
export async function getRestaurantWithDishes(restaurantId) {
  const restaurant = await Restaurant.findById(restaurantId).lean();
  if (!restaurant) throw new Error("Restaurant not Found");

  const dishes = await Dish.find({ restaurantId }).lean();
  return { ...restaurant, dishes };
}

// Service for fetching all restaurants
export async function getAllRestaurants() {
  const restaurants = await Restaurant.find().lean();
  return restaurants;
}


// Service for updating restaurant data
export async function updateRestaurant(restaurantId, data) {
  const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {$set: data}, {new:true});
  return restaurant;
}

// Service for getting all dishes
export async function getAllDishes(){
  const dishes = await Dish.find().lean();
  if (!dishes) throw new Error("Dishes not found");
  await Promise.all(
  dishes.map(async (dish) => {
    const restaurantData = await Restaurant.findById(dish.restaurantId).lean();
    if (!restaurantData) throw new Error(`Restaurant Data not found for ${dish.name}`);

    dish.restaurantName = restaurantData.name;
    dish.address = restaurantData.address;
    dish.rating = restaurantData.rating;
    dish.review = restaurantData.reviewCount;
  })
  
  );

  return dishes;
}