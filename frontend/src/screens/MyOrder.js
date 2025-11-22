import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyOrder = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            console.log("Fetching orders for:", email);

            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            console.log("🔹 Full API Response:", data);

            // Clean the order data
            const cleanedOrders = data.orderData.map(orderArray => {
                const rawDate = orderArray[0]?.Order_date;

                // Convert date
                const parsedDate = new Date(rawDate);
                const orderDate = !isNaN(parsedDate.getTime())
                    ? parsedDate.toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                    : "Invalid Date";

                const items = orderArray.slice(1); // Get food items

                return { orderDate, items };
            });

            console.log("Cleaned Orders:", cleanedOrders);
            setOrderData(cleanedOrders);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <style>
                {`
                    .orders-container {
                        min-height: calc(100vh - 200px);
                        background: #f9fafb;
                        padding: 2rem 0;
                    }
                    
                    .orders-header {
                        text-align: center;
                        margin-bottom: 3rem;
                        animation: fadeIn 0.6s ease-out;
                    }
                    
                    .orders-title {
                        font-size: 2.5rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #10b981, #059669);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 0.5rem;
                    }
                    
                    .orders-subtitle {
                        color: #6b7280;
                        font-size: 1.1rem;
                    }
                    
                    .order-card {
                        background: white;
                        border-radius: 1rem;
                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                        padding: 2rem;
                        margin-bottom: 2rem;
                        animation: slideIn 0.6s ease-out;
                    }
                    
                    .order-date-header {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        margin-bottom: 1.5rem;
                        padding-bottom: 1rem;
                        border-bottom: 2px solid #10b981;
                    }
                    
                    .order-date-icon {
                        font-size: 1.5rem;
                    }
                    
                    .order-date-text {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #10b981;
                        margin: 0;
                    }
                    
                    .order-items-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                        gap: 1.5rem;
                    }
                    
                    .order-item-card {
                        background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
                        border: 2px solid #e5e7eb;
                        border-radius: 0.75rem;
                        padding: 1.5rem;
                        transition: all 0.3s ease;
                    }
                    
                    .order-item-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                        border-color: #10b981;
                    }
                    
                    .item-name {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #111827;
                        margin-bottom: 1rem;
                    }
                    
                    .item-detail {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0.5rem 0;
                        color: #6b7280;
                    }
                    
                    .item-detail-label {
                        font-weight: 500;
                    }
                    
                    .item-detail-value {
                        font-weight: 600;
                        color: #111827;
                    }
                    
                    .item-price {
                        margin-top: 1rem;
                        padding-top: 1rem;
                        border-top: 1px solid #e5e7eb;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #10b981;
                        text-align: center;
                    }
                    
                    .empty-orders {
                        text-align: center;
                        padding: 4rem 2rem;
                        background: white;
                        border-radius: 1rem;
                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    }
                    
                    .empty-orders-icon {
                        font-size: 5rem;
                        margin-bottom: 1rem;
                        opacity: 0.5;
                    }
                    
                    .empty-orders-title {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #111827;
                        margin-bottom: 0.5rem;
                    }
                    
                    .empty-orders-text {
                        color: #6b7280;
                        font-size: 1rem;
                    }
                    
                    .loading-spinner {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 400px;
                    }
                    
                    .spinner {
                        border: 4px solid rgba(16, 185, 129, 0.1);
                        border-left-color: #10b981;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                    }
                    
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    
                    @media (max-width: 768px) {
                        .orders-title {
                            font-size: 2rem;
                        }
                        
                        .order-card {
                            padding: 1.5rem;
                        }
                        
                        .order-items-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}
            </style>
            
            <Navbar />
            
            <div className="orders-container">
                <div className="container">
                    <div className="orders-header">
                        <h1 className="orders-title">📦 My Orders</h1>
                        <p className="orders-subtitle">Track and view your order history</p>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    ) : orderData.length === 0 ? (
                        <div className="empty-orders">
                            <div className="empty-orders-icon">📭</div>
                            <h3 className="empty-orders-title">No Orders Yet</h3>
                            <p className="empty-orders-text">Start ordering delicious food to see your order history here!</p>
                        </div>
                    ) : (
                        <div>
                            {orderData.map((order, index) => (
                                <div key={index} className="order-card">
                                    <div className="order-date-header">
                                        <span className="order-date-icon">📅</span>
                                        <h5 className="order-date-text">{order.orderDate}</h5>
                                    </div>
                                    
                                    <div className="order-items-grid">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="order-item-card">
                                                <div className="item-name">{item.name}</div>
                                                
                                                <div className="item-detail">
                                                    <span className="item-detail-label">Quantity:</span>
                                                    <span className="item-detail-value">{item.qty}</span>
                                                </div>
                                                
                                                <div className="item-detail">
                                                    <span className="item-detail-label">Size:</span>
                                                    <span className="item-detail-value">{item.size}</span>
                                                </div>
                                                
                                                <div className="item-price">
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </>
    );
}
