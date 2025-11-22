const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood?retryWrites=true&w=majority';

async function updateImage() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');

        const db = mongoose.connection.db;
        
        // Update Mix Veg Pizza image
        const result = await db.collection('food_items').updateOne(
            { name: 'Mix Veg Pizza' },
            { 
                $set: { 
                    img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' 
                } 
            }
        );

        console.log('✅ Update result:', result);
        
        if (result.modifiedCount > 0) {
            console.log('✅ Mix Veg Pizza image updated successfully!');
        } else {
            console.log('⚠️ No document was updated. Item might not exist.');
        }

        // Verify the update
        const updatedItem = await db.collection('food_items').findOne({ name: 'Mix Veg Pizza' });
        console.log('📸 Updated image URL:', updatedItem?.img);

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating image:', error);
        process.exit(1);
    }
}

updateImage();
