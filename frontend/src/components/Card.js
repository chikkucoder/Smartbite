import React, { useEffect,useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
let dispatch = useDispatchCart();
let data = useCart()
const priceRef = useRef();
const [imgError, setImgError] = useState(false);

// Fallback image URLs for specific items
const fallbackImages = {
    'Mix Veg Pizza': 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop',
    'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
};

const handleImageError = () => {
    setImgError(true);
};

    let options = props.options;
    let priceOptions =Object.keys(options);
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("")
    
    //cart button
    const handleAddToCart = async ()=>{
    let food = []
    for (const item of data){
        if(item.id ===props.foodItem._id){
            food = item;
            break;
        }
    }
 if (food.length !== 0) {

  if(food.size === size){
    await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
    return
  }
  else if (food.size !== size){
        await dispatch({type:"ADD",id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
        return
  }//await console.log(data);
  return
 }
  await dispatch({type:"ADD",id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
  
}


    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div className="fade-in">    
            <style>
                {`
                    .card-modern {
                        border: none;
                        border-radius: 1rem;
                        overflow: hidden;
                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        background: white;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .card-modern:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
                    }
                    
                    .card-img-modern {
                        height: 200px;
                        object-fit: cover;
                        transition: transform 0.3s ease;
                    }
                    
                    .card-modern:hover .card-img-modern {
                        transform: scale(1.1);
                    }
                    
                    .card-img-wrapper {
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .card-img-overlay-modern {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .card-modern:hover .card-img-overlay-modern {
                        opacity: 1;
                    }
                    
                    .card-body-modern {
                        padding: 1.25rem;
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .card-title-modern {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #111827;
                        margin-bottom: 1rem;
                        line-height: 1.4;
                    }
                    
                    .select-modern {
                        padding: 0.5rem 0.75rem;
                        border-radius: 0.5rem;
                        border: 2px solid #e5e7eb;
                        background: white;
                        color: #111827;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        margin: 0.25rem;
                    }
                    
                    .select-modern:focus {
                        outline: none;
                        border-color: #10b981;
                        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
                    }
                    
                    .select-modern:hover {
                        border-color: #10b981;
                    }
                    
                    .price-tag-modern {
                        display: inline-block;
                        padding: 0.5rem 1rem;
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        border-radius: 0.5rem;
                        font-size: 1.25rem;
                        font-weight: 700;
                        margin: 0.5rem 0;
                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    }
                    
                    .btn-add-cart-modern {
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.5rem;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        width: 100%;
                        margin-top: auto;
                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    }
                    
                    .btn-add-cart-modern:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                        background: linear-gradient(135deg, #059669, #047857);
                    }
                    
                    .btn-add-cart-modern:active {
                        transform: translateY(0);
                    }
                    
                    .controls-wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        margin-bottom: 0.5rem;
                    }
                    
                    @media (max-width: 576px) {
                        .card-modern {
                            margin-bottom: 1rem;
                        }
                        
                        .select-modern {
                            flex: 1;
                            min-width: calc(50% - 0.25rem);
                        }
                    }
                `}
            </style>
            <div className="card-modern">
                <div className="card-img-wrapper">
                    <img 
                        src={imgError ? (fallbackImages[props.foodItem.name] || fallbackImages['default']) : props.foodItem.img} 
                        className="card-img-modern" 
                        alt={props.foodItem.name}
                        onError={handleImageError}
                    />
                    <div className="card-img-overlay-modern"></div>
                </div>
                <div className="card-body-modern">
                    <h5 className="card-title-modern">{props.foodItem.name}</h5>
                    <div className='controls-wrapper'>
                        <select className='select-modern' onChange={(e)=> setQty(e.target.value) }>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> Qty: {i + 1} </option>
                                )
                            })}
                        </select>

                        <select className='select-modern' ref={priceRef} onChange={(e)=> setSize(e.target.value) }>
                        {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                    </div>

                    <div className='price-tag-modern'>
                        ₹{finalPrice}/-
                    </div>
                    
                    <button className='btn-add-cart-modern' onClick={handleAddToCart}>
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
