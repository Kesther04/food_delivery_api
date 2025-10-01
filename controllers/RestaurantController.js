import * as Service from "../services/RestaurantService.js";

// for getting data of all restaurants
export const AllRestaurants = async (req, res) => {
    try {
        const restaurants = await Service.getAllRestaurants();
        if (restaurants.length == 0 ) throw new Error ("No restaurants found");   
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

// for creating a new restaurant
export const CreateRestaurant = async (req, res) => {
    try {
        const { name, description, address } = req.body;
        const restaurant = await Service.createRestaurant({ name, description, address });
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// for updating data of a restaurant
export const UpdateRestaurant = async (req,res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Service.updateRestaurant(restaurantId, req.body);
        res.status(204).json(restaurant);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// for getting specific restaurant data with it's dishes
export const RestaurantWithDishes = async (req,res) => {
    try {
        const restaurantId  = req.params.id;
        const restaurant = await Service.getRestaurantWithDishes(restaurantId);
        res.status(200).json(restaurant);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}