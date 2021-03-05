import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {

    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced]= useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();

        console.log('Order placed');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProdcuts = productKeys.map(key => {
            const product = fakeData.find (pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        
        setCart(cartProdcuts);
    }, [] )

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>;
    }
    return (
        <div className='twin-container'>
            
            <div className='product-container'>
            {
                cart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct} ></ReviewItem>)
            }
            {thankYou}
            
            </div>

            <div className="cart-container">
                <h3>Shopping Cart</h3>
                
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='main-button'>Order Now</button>
                </Cart>

            </div>

        </div>
    );
};

export default Review;