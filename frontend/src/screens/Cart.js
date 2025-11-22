import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Checkout from "../components/Checkout";  // Import the Checkout component

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div style={{padding: '3rem', textAlign: 'center'}}>
        <style>
          {`
            .empty-cart {
              animation: fadeIn 0.6s ease-out;
            }
            
            .empty-cart-icon {
              font-size: 5rem;
              margin-bottom: 1rem;
              opacity: 0.5;
            }
            
            .empty-cart-text {
              color: white;
              font-size: 1.5rem;
              font-weight: 600;
            }
          `}
        </style>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <div className="empty-cart-text">Your Cart is Empty!</div>
          <p style={{color: 'rgba(255,255,255,0.7)', marginTop: '1rem'}}>Add some delicious items to get started</p>
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("Retrieved userEmail:", userEmail);

    if (!userEmail) {
      alert("User email not found. Please log in.");
      window.location.href = "/login";
      return;
    }

    if (!Array.isArray(data) || data.length === 0) {
      alert("Cart data is invalid.");
      return;
    }

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("Order RESPONSE:::::", response.status);
    if (response.ok) {
      dispatch({ type: "DROP" });
      alert("Order placed successfully!");
    } else {
      let errorData = await response.json();
      console.log("🔹 Order ERROR response:", errorData);
      alert("Order failed: " + errorData.error);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto'}}>
      <style>
        {`
          .cart-container {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            padding: 2rem;
            animation: slideIn 0.6s ease-out;
          }
          
          .cart-title {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .table-modern {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
          }
          
          .table-modern thead {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
          }
          
          .table-modern thead th {
            padding: 1rem;
            font-weight: 600;
            text-align: left;
          }
          
          .table-modern thead th:first-child {
            border-top-left-radius: 0.5rem;
          }
          
          .table-modern thead th:last-child {
            border-top-right-radius: 0.5rem;
          }
          
          .table-modern tbody tr {
            border-bottom: 1px solid #e5e7eb;
            transition: background 0.2s ease;
          }
          
          .table-modern tbody tr:hover {
            background: #f9fafb;
          }
          
          .table-modern tbody td {
            padding: 1rem;
            color: #374151;
          }
          
          .delete-btn {
            background: transparent;
            border: none;
            color: #ef4444;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
          }
          
          .delete-btn:hover {
            background: #fee2e2;
            transform: scale(1.1);
          }
          
          .total-section {
            margin-top: 2rem;
            padding: 1.5rem;
            background: #f9fafb;
            border-radius: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .total-price {
            font-size: 1.75rem;
            font-weight: 700;
            color: #10b981;
          }
          
          .checkout-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
          
          .btn-checkout {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          
          .btn-checkout:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
          }
          
          @media (max-width: 768px) {
            .cart-container {
              padding: 1rem;
            }
            
            .table-responsive {
              overflow-x: auto;
            }
            
            .total-section {
              flex-direction: column;
              text-align: center;
            }
            
            .checkout-actions {
              width: 100%;
              flex-direction: column;
            }
            
            .btn-checkout {
              width: 100%;
            }
          }
        `}
      </style>
      
      <div className="cart-container">
        <h1 className="cart-title">🛒 Shopping Cart</h1>
        
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td style={{fontWeight: 600}}>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td style={{fontWeight: 600, color: '#10b981'}}>₹{food.price}</td>
                  <td>
                    <button className="delete-btn" onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total-section">
          <div className="total-price">
            Total: ₹{totalPrice}/-
          </div>
          
          <div className="checkout-actions">
            <button className="btn-checkout" onClick={handleCheckOut}>
              💳 Checkout
            </button>
            <Checkout totalAmount={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
