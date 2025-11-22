const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood?retryWrites=true&w=majority';

let isConnected = false;

const mongoDB = async () => {
    // Reuse existing connection if available
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        isConnected = true;
        console.log('MongoDB connected successfully');

        // Use mongoose.connection.getClient() for newer versions
        const client = mongoose.connection.getClient();
        const db = client.db('Royfood');
        
        if (!db) {
            console.error('Database instance not available');
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
        isConnected = false;
        console.error('MongoDB connection error:', error.message);
        throw error;
    }
};

module.exports = mongoDB;
