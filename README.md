# 🍔 SmartBite - Food Delivery Application

A modern, full-stack MERN (MongoDB, Express, React, Node.js) food delivery application with beautiful UI/UX and responsive design.

## 📁 Project Structure

```
mernapp/
├── frontend/          # React frontend application
│   ├── src/          # React components and screens
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
│
├── backend/          # Node.js/Express backend
│   ├── Routes/       # API routes
│   ├── models/       # MongoDB models
│   ├── db.js         # Database configuration
│   ├── index.js      # Server entry point
│   └── package.json  # Backend dependencies
│
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mernapp
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   node index.js
   ```
   Backend will run on: `http://localhost:5000`

2. **Start Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on: `http://localhost:3000`

## ✨ Features

- 🔐 User Authentication (Login/Signup)
- 🍕 Browse Food Items by Categories
- 🔍 Search Functionality
- 🛒 Shopping Cart
- 💳 Payment Integration (Razorpay)
- 📦 Order History
- 📱 Fully Responsive Design
- 🎨 Modern UI/UX with Animations

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- Bootstrap 5
- Material-UI Icons
- CSS3 with modern animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- Google Generative AI (Chatbot)

## 📝 Environment Variables

Create a `.env` file in the `backend` folder:

```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ by SmartBite Team

---

**Happy Coding! 🎉**
