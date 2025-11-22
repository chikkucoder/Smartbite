import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import  Modal  from './Modal';
import Cart from '../screens/Cart';
import Chatbot from './Chatbot';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView,setCartView] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  let data = useCart();

  const navigate = useNavigate();
  const handlelogout = ()=>{
       localStorage.removeItem("authToken");
       navigate("/login")
  }

  // Add scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <style>
        {`
          .navbar-modern {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
            transition: all 0.3s ease;
            padding: 1rem 0;
          }
          
          .navbar-modern.scrolled {
            padding: 0.5rem 0;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
          }
          
          .navbar-brand-modern {
            font-size: 2rem !important;
            font-weight: 800 !important;
            background: linear-gradient(to right, #ffffff, #d1fae5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
            transition: all 0.3s ease;
          }
          
          .navbar-brand-modern:hover {
            transform: scale(1.05);
          }
          
          .nav-link-modern {
            color: rgba(255, 255, 255, 0.9) !important;
            font-weight: 500 !important;
            padding: 0.5rem 1rem !important;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .nav-link-modern::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: white;
            transition: width 0.3s ease;
          }
          
          .nav-link-modern:hover {
            color: white !important;
            background: rgba(255, 255, 255, 0.1);
          }
          
          .nav-link-modern:hover::after {
            width: 80%;
          }
          
          .btn-modern-outline {
            background: transparent;
            border: 2px solid white;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
            margin: 0 0.25rem;
          }
          
          .btn-modern-outline:hover {
            background: white;
            color: #10b981;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .btn-cart-modern {
            background: white;
            color: #10b981;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
            margin: 0 0.25rem;
            border: none;
            position: relative;
          }
          
          .btn-cart-modern:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background: #f0fdf4;
          }
          
          .btn-logout-modern {
            background: #ef4444;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
            margin: 0 0.25rem;
            border: none;
          }
          
          .btn-logout-modern:hover {
            background: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .badge-modern {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
          
          @media (max-width: 991px) {
            .navbar-brand-modern {
              font-size: 1.5rem !important;
            }
            
            .btn-modern-outline,
            .btn-cart-modern,
            .btn-logout-modern {
              width: 100%;
              margin: 0.25rem 0;
            }
          }
        `}
      </style>
      <nav className={`navbar navbar-expand-lg navbar-dark navbar-modern ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand navbar-brand-modern" to="/">
            🍔 SmartBite
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <Link className="nav-link nav-link-modern active" aria-current="page" to="/">
                  🏠 Home
                </Link>
              </li>
            {(localStorage.getItem("authToken"))?
          <li className="nav-item">
          <Link className="nav-link nav-link-modern active" aria-current="page" to="/myOrder">
            📦 My Orders
          </Link>
        </li>  
          :""} 

            </ul>

            {(!localStorage.getItem("authToken"))?

            <div className='d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center'>
              <Link className="btn btn-modern-outline" to="/login">
                🔐 Login
              </Link>
             <Link className="btn btn-modern-outline" to="/creatuser">
               ✨ Signup
             </Link>
            </div>
            :
            <div className='d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center'>
            <button className='btn btn-cart-modern' onClick={()=>{setCartView(true)}}>
             🛒 My Cart {" "}
             <Badge pill bg="danger" className="badge-modern"> {data.length} </Badge>
              </button>
      {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
        
            <button className='btn btn-logout-modern' onClick={handlelogout}>
             🚪 Logout
          </button>
          </div>
          }
          
        </div>
        </div>
      </nav>
      <Chatbot />
    </div>
  )
}
