import * as Services from "../services/RestaurantService.js";


// to add or update Dishes of a Restaurant
export const alterDish = async (req,res) => {
    try{
        const dishData = req.body;
        const { restaurantId } = dishData;
        const dish = await Services.addOrUpdateDish(restaurantId,dishData);
        res.status(201).json(dish);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
} 

// to get specific dishes
export const getDish = async ( req, res) => {
    try {
        const dishId = req.params.id;
        const dish = await Services.readDish(dishId);
        res.status(200).json(dish);
    } catch (error) {
        res.status(400).json({err:error.message});
    }
}


// to get all dishes
export const allDishes = async ( req,res ) => {
    try {
        const dishes = await Services.getAllDishes();
        res.status(200).json(dishes);
    } catch (err) {
        res.status(400).json({err:err.message});       
    }
}