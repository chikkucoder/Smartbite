const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');

        // Wait for connection to be ready
        const db = mongoose.connection.db;
        
        if (!db) {
            throw new Error('Database connection not established');
        }

        // Fetch the food_items collection
        const fetched_data = await db.collection("food_items").find({}).toArray();
        
        // Store data globally
        global.food_items = fetched_data;
        console.log("Food items fetched:", fetched_data.length, "items"); 

        //food category
        const foodCategory = await db.collection("foodCategory").find({}).toArray();
        
        //store data globally
        global.foodCategory = foodCategory;
        console.log("Food categories fetched:", foodCategory.length, "categories"); 

    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Don't exit process on Vercel, just throw error
    }
};

module.exports = mongoDB;
