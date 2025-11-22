import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {

  //search bar
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      let response = await fetch(`${API_URL}/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();

      setFoodItem(response[0])
      setFoodCategory(response[1])
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])



  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      <style>
        {`
          .hero-section {
            position: relative;
            height: 600px;
            overflow: hidden;
          }
          
          .carousel-modern .carousel-item {
            height: 600px;
          }
          
          .carousel-modern .carousel-item img {
            height: 100%;
            object-fit: cover;
            filter: brightness(50%);
          }
          
          .search-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            width: 90%;
            max-width: 600px;
          }
          
          .search-header {
            text-align: center;
            color: white;
            margin-bottom: 2rem;
            animation: fadeIn 0.8s ease-out;
          }
          
          .search-header h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          
          .search-header p {
            font-size: 1.25rem;
            opacity: 0.9;
          }
          
          .search-box-modern {
            display: flex;
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3);
            animation: slideIn 1s ease-out;
          }
          
          .search-input-modern {
            flex: 1;
            border: none;
            padding: 1.25rem 1.5rem;
            font-size: 1.1rem;
            outline: none;
          }
          
          .search-input-modern::placeholder {
            color: #9ca3af;
          }
          
          .search-btn-modern {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 0 2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .search-btn-modern:hover {
            background: linear-gradient(135deg, #059669, #047857);
          }
          
          .category-section {
            padding: 3rem 0;
          }
          
          .category-header {
            display: flex;
            align-items: center;
            margin: 2rem 0 1.5rem 0;
            padding-bottom: 1rem;
            border-bottom: 3px solid #10b981;
          }
          
          .category-title {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin: 0;
            background: linear-gradient(135deg, #10b981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .category-count {
            margin-left: auto;
            background: #10b981;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-weight: 600;
            font-size: 0.9rem;
          }
          
          .food-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
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
          
          .no-results {
            text-align: center;
            padding: 4rem 2rem;
            color: #6b7280;
          }
          
          .no-results-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          
          @media (max-width: 768px) {
            .hero-section {
              height: 400px;
            }
            
            .carousel-modern .carousel-item {
              height: 400px;
            }
            
            .search-header h1 {
              font-size: 2rem;
            }
            
            .search-header p {
              font-size: 1rem;
            }
            
            .food-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 1.5rem;
            }
            
            .category-title {
              font-size: 1.5rem;
            }
          }
          
          @media (max-width: 576px) {
            .food-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
          }
        `}
      </style>
      
      <Navbar />

      <div className="hero-section">
        <div id="carouselExampleFade" className="carousel slide carousel-fade carousel-modern" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&h=600&fit=crop" alt="Delicious burger" />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&h=600&fit=crop" alt="Pizza" />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=600&fit=crop" alt="Food spread" />
            </div>
          </div>
          
          <div className="search-wrapper">
            <div className="search-header">
              <h1>🍽️ SmartBite</h1>
              <p>Discover delicious food at your fingertips</p>
            </div>
            <div className="search-box-modern">
              <input 
                className="search-input-modern" 
                type="search" 
                placeholder="Search for your favorite food..." 
                value={search} 
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              <button className="search-btn-modern">🔍 Search</button>
            </div>
          </div>
          
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container category-section'>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          foodCategory.length > 0 &&
          foodCategory.map((data) => {
            const filteredItems = foodItem.filter((item) => 
              (item.CategoryName === data.CategoryName) && 
              (item.name.toLowerCase().includes(search.toLowerCase()))
            );
            
            if (filteredItems.length === 0 && search) return null;
            
            return (
              <div key={data._id} className="mb-5">
                <div className="category-header">
                  <h2 className="category-title">
                    {data.CategoryName}
                  </h2>
                  <span className="category-count">
                    {filteredItems.length} items
                  </span>
                </div>
                
                {filteredItems.length > 0 ? (
                  <div className="food-grid">
                    {filteredItems.map(filterItems => (
                      <Card 
                        key={filterItems._id}
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No items found</h3>
                    <p>Try searching for something else</p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <Footer />
    </div>
  )
}
