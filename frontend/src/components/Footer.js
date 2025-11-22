import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <style>
        {`
          .footer-modern {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 3rem 0 1.5rem;
            margin-top: 4rem;
          }
          
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
          }
          
          .footer-section h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #10b981;
          }
          
          .footer-section p,
          .footer-section a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            line-height: 1.8;
            transition: color 0.3s ease;
          }
          
          .footer-section a:hover {
            color: #10b981;
          }
          
          .footer-links {
            list-style: none;
            padding: 0;
          }
          
          .footer-links li {
            margin-bottom: 0.5rem;
          }
          
          .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
          
          .social-link {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          
          .social-link:hover {
            background: #10b981;
            transform: translateY(-3px);
          }
          
          .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1.5rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
          }
          
          .footer-brand {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(to right, #10b981, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
        `}
      </style>
      
      <footer className="footer-modern">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-brand">🍔 SmartBite</h3>
              <p>Delicious food delivered to your doorstep. Fast, fresh, and always satisfying.</p>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">👍</a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
                <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
                <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/myOrder">My Orders</Link></li>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><Link to="/">Help Center</Link></li>
                <li><Link to="/">Terms of Service</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">FAQs</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>📍 123 Food Street, Flavor City</p>
              <p>📧 info@smartbite.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 SmartBite. All rights reserved. Made with ❤️ by the SmartBite Team</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
