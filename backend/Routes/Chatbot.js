const express = require('express');
const router = express.Router();

// Food data training
const foodData = {
    starters: [
        { name: 'Chilli Paneer', type: 'veg', price: { half: 100, full: 180 } },
        { name: 'Paneer Tikka', type: 'veg', price: { half: 120, full: 200 } },
        { name: 'Paneer 65', type: 'veg', price: { half: 110, full: 190 } },
        { name: 'Chicken Tikka', type: 'non-veg', price: { half: 150, full: 250 } }
    ],
    biryani: [
        { name: 'Veg Biryani', type: 'veg', price: { half: 130, full: 220 } },
        { name: 'Chicken Biryani', type: 'non-veg', price: { half: 180, full: 300 } },
        { name: 'Fish Biryani', type: 'non-veg', price: { half: 200, full: 350 } }
    ],
    rice: [
        { name: 'Veg Fried Rice', type: 'veg', price: { half: 110, full: 180 } },
        { name: 'Chicken Fried Rice', type: 'non-veg', price: { half: 130, full: 220 } },
        { name: 'Prawns Fried Rice', type: 'non-veg', price: { half: 170, full: 280 } }
    ],
    pizza: [
        { name: 'Mix Veg Pizza', type: 'veg', price: { medium: 200, large: 350 } },
        { name: 'Chicken Cheese Pizza', type: 'non-veg', price: { medium: 250, large: 450 } }
    ]
};

// Helper functions
const getAllItems = () => {
    return [...foodData.starters, ...foodData.biryani, ...foodData.rice, ...foodData.pizza];
};

const getVegItems = () => {
    return getAllItems().filter(item => item.type === 'veg');
};

const getNonVegItems = () => {
    return getAllItems().filter(item => item.type === 'non-veg');
};

const findItemByName = (query) => {
    return getAllItems().find(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );
};

const getCheapestItems = (type = 'all') => {
    let items = type === 'veg' ? getVegItems() : type === 'non-veg' ? getNonVegItems() : getAllItems();
    return items.sort((a, b) => {
        const priceA = a.price.half || a.price.medium;
        const priceB = b.price.half || b.price.medium;
        return priceA - priceB;
    });
};

const getExpensiveItems = (type = 'all') => {
    let items = type === 'veg' ? getVegItems() : type === 'non-veg' ? getNonVegItems() : getAllItems();
    return items.sort((a, b) => {
        const priceA = a.price.full || a.price.large;
        const priceB = b.price.full || b.price.large;
        return priceB - priceA;
    });
};

router.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    let response;

    // Greetings
    if (userMessage.match(/\b(hello|hi|hey|namaste|hola)\b/)) {
        response = 'Hello! 👋 Welcome to SmartBite! I can help you with our menu, prices, and recommendations. What would you like to know?';
    }
    
    // Menu queries
    else if (userMessage.includes('menu') || userMessage.includes('what do you have')) {
        response = '🍽️ We have:\n\n🥗 Starters: Paneer Tikka, Chilli Paneer, Paneer 65, Chicken Tikka\n🍚 Biryani/Rice: Veg Biryani, Chicken Biryani, Fish Biryani, Fried Rice\n🍕 Pizza: Mix Veg Pizza, Chicken Cheese Pizza\n\nAsk me about any specific item!';
    }
    
    // Veg items
    else if ((userMessage.includes('veg') && !userMessage.includes('non')) || userMessage.includes('vegetarian')) {
        if (userMessage.includes('price') || userMessage.includes('cost')) {
            const vegItems = getVegItems();
            response = '🥬 Veg Items & Prices:\n\n' + vegItems.map(item => {
                const prices = item.price.half ? `Half: ₹${item.price.half}, Full: ₹${item.price.full}` : `Medium: ₹${item.price.medium}, Large: ₹${item.price.large}`;
                return `• ${item.name} - ${prices}`;
            }).join('\n');
        } else if (userMessage.includes('cheap') || userMessage.includes('lowest')) {
            const cheapest = getCheapestItems('veg')[0];
            const price = cheapest.price.half || cheapest.price.medium;
            response = `💰 Cheapest Veg Item: ${cheapest.name} at ₹${price}`;
        } else if (userMessage.includes('expensive') || userMessage.includes('highest')) {
            const expensive = getExpensiveItems('veg')[0];
            const price = expensive.price.full || expensive.price.large;
            response = `💎 Most Expensive Veg Item: ${expensive.name} at ₹${price}`;
        } else {
            const vegItems = getVegItems();
            response = '🥬 Veg Items:\n\n' + vegItems.map(item => `• ${item.name}`).join('\n');
        }
    }
    
    // Non-veg items
    else if (userMessage.includes('non') && userMessage.includes('veg') || userMessage.includes('chicken') || userMessage.includes('fish') || userMessage.includes('meat')) {
        if (userMessage.includes('price') || userMessage.includes('cost')) {
            const nonVegItems = getNonVegItems();
            response = '🍗 Non-Veg Items & Prices:\n\n' + nonVegItems.map(item => {
                const prices = item.price.half ? `Half: ₹${item.price.half}, Full: ₹${item.price.full}` : `Medium: ₹${item.price.medium}, Large: ₹${item.price.large}`;
                return `• ${item.name} - ${prices}`;
            }).join('\n');
        } else if (userMessage.includes('cheap') || userMessage.includes('lowest')) {
            const cheapest = getCheapestItems('non-veg')[0];
            const price = cheapest.price.half || cheapest.price.medium;
            response = `💰 Cheapest Non-Veg Item: ${cheapest.name} at ₹${price}`;
        } else if (userMessage.includes('expensive') || userMessage.includes('highest')) {
            const expensive = getExpensiveItems('non-veg')[0];
            const price = expensive.price.full || expensive.price.large;
            response = `💎 Most Expensive Non-Veg Item: ${expensive.name} at ₹${price}`;
        } else {
            const nonVegItems = getNonVegItems();
            response = '🍗 Non-Veg Items:\n\n' + nonVegItems.map(item => `• ${item.name}`).join('\n');
        }
    }
    
    // Starters
    else if (userMessage.includes('starter') || userMessage.includes('appetizer')) {
        response = '🥗 Our Starters:\n\n' + foodData.starters.map(item => {
            const prices = `Half: ₹${item.price.half}, Full: ₹${item.price.full}`;
            return `• ${item.name} (${item.type}) - ${prices}`;
        }).join('\n');
    }
    
    // Biryani
    else if (userMessage.includes('biryani')) {
        response = '🍚 Our Biryanis:\n\n' + foodData.biryani.map(item => {
            const prices = `Half: ₹${item.price.half}, Full: ₹${item.price.full}`;
            return `• ${item.name} - ${prices}`;
        }).join('\n');
    }
    
    // Rice
    else if (userMessage.includes('rice') && userMessage.includes('fried')) {
        response = '🍚 Our Fried Rice:\n\n' + foodData.rice.map(item => {
            const prices = `Half: ₹${item.price.half}, Full: ₹${item.price.full}`;
            return `• ${item.name} - ${prices}`;
        }).join('\n');
    }
    
    // Pizza
    else if (userMessage.includes('pizza')) {
        response = '🍕 Our Pizzas:\n\n' + foodData.pizza.map(item => {
            const prices = `Medium: ₹${item.price.medium}, Large: ₹${item.price.large}`;
            return `• ${item.name} - ${prices}`;
        }).join('\n');
    }
    
    // Price queries for specific items
    else if (userMessage.includes('price') || userMessage.includes('cost')) {
        const allItems = getAllItems();
        const foundItem = allItems.find(item => userMessage.includes(item.name.toLowerCase()));
        
        if (foundItem) {
            const prices = foundItem.price.half 
                ? `Half: ₹${foundItem.price.half}, Full: ₹${foundItem.price.full}` 
                : `Medium: ₹${foundItem.price.medium}, Large: ₹${foundItem.price.large}`;
            response = `💰 ${foundItem.name} prices:\n${prices}`;
        } else if (userMessage.includes('all')) {
            response = '💰 All Items & Prices:\n\n' + allItems.map(item => {
                const prices = item.price.half 
                    ? `Half: ₹${item.price.half}, Full: ₹${item.price.full}` 
                    : `Medium: ₹${item.price.medium}, Large: ₹${item.price.large}`;
                return `• ${item.name} - ${prices}`;
            }).join('\n');
        } else {
            response = 'Please specify which item\'s price you want to know. You can ask about starters, biryani, rice, or pizza!';
        }
    }
    
    // Recommendations
    else if (userMessage.includes('recommend') || userMessage.includes('suggest') || userMessage.includes('best')) {
        response = '⭐ Our Top Recommendations:\n\n🥬 Veg: Paneer Tikka (₹120/₹200)\n🍗 Non-Veg: Chicken Biryani (₹180/₹300)\n🍕 Pizza: Chicken Cheese Pizza (₹250/₹450)\n\nAll are customer favorites!';
    }
    
    // Cheap/Budget
    else if (userMessage.includes('cheap') || userMessage.includes('budget') || userMessage.includes('affordable')) {
        const cheapest = getCheapestItems()[0];
        const price = cheapest.price.half || cheapest.price.medium;
        response = `💰 Most Affordable: ${cheapest.name} at just ₹${price}!`;
    }
    
    // Order related
    else if (userMessage.includes('order') || userMessage.includes('how to')) {
        response = '🛒 To order:\n1. Browse our menu on the Home page\n2. Add items to cart\n3. Click on "My Cart"\n4. Checkout and pay\n\nNeed help with anything else?';
    }
    
    // Delivery
    else if (userMessage.includes('delivery') || userMessage.includes('deliver')) {
        response = '🚚 We deliver fresh food to your doorstep! Add items to cart and proceed to checkout. Delivery time is usually 30-45 minutes.';
    }
    
    // Thank you
    else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        response = 'You\'re welcome! 😊 Enjoy your meal at SmartBite! Feel free to ask if you need anything else.';
    }
    
    // Default
    else {
        response = "I'm not sure about that. You can ask me about:\n\n• Menu items (veg/non-veg)\n• Prices\n• Recommendations\n• How to order\n• Delivery\n\nWhat would you like to know?";
    }

    res.json({ reply: response });
});

module.exports = router;
