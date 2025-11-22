import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'


export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    setLoading(false)
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }

    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
      <style>
        {`
          .auth-card {
            background: white;
            border-radius: 1.5rem;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3);
            max-width: 450px;
            width: 100%;
            padding: 3rem;
            animation: slideIn 0.6s ease-out;
          }
          
          .auth-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .auth-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          
          .auth-title {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          
          .auth-subtitle {
            color: #6b7280;
            font-size: 0.95rem;
          }
          
          .form-group-modern {
            margin-bottom: 1.5rem;
          }
          
          .form-label-modern {
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
            display: block;
          }
          
          .form-input-modern {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: all 0.3s ease;
          }
          
          .form-input-modern:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          }
          
          .form-hint {
            font-size: 0.85rem;
            color: #6b7280;
            margin-top: 0.5rem;
          }
          
          .btn-submit-modern {
            width: 100%;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 0.875rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 1rem;
          }
          
          .btn-submit-modern:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
          }
          
          .btn-submit-modern:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .btn-secondary-modern {
            width: 100%;
            background: transparent;
            color: #10b981;
            border: 2px solid #10b981;
            padding: 0.875rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
          }
          
          .btn-secondary-modern:hover {
            background: #10b981;
            color: white;
            transform: translateY(-2px);
          }
          
          @media (max-width: 576px) {
            .auth-card {
              padding: 2rem;
            }
          }
        `}
      </style>
      
      <div className='auth-card'>
        <div className='auth-header'>
          <div className='auth-icon'>🔐</div>
          <h1 className='auth-title'>Welcome Back!</h1>
          <p className='auth-subtitle'>Login to continue your food journey</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group-modern">
            <label htmlFor="email" className="form-label-modern">Email address</label>
            <input 
              type="email" 
              className="form-input-modern" 
              name='email' 
              value={credentials.email} 
              onChange={onChange} 
              id="email" 
              placeholder="Enter your email"
              required
            />
            <div className="form-hint">We'll never share your email with anyone else.</div>
          </div>
          
          <div className="form-group-modern">
            <label htmlFor="password" className="form-label-modern">Password</label>
            <input 
              type="password" 
              className="form-input-modern" 
              name='password' 
              value={credentials.password} 
              onChange={onChange} 
              id="password" 
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-submit-modern" disabled={loading}>
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
          
          <Link to="/creatuser" className='btn-secondary-modern'>
            ✨ Create New Account
          </Link>
        </form>
      </div>
    </div>
  )
}       
