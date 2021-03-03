import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handlerAddProduct = (product) => {
        
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (

        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(product => <Product showAddToCart={true} handlerAddProduct = {handlerAddProduct} product={product}></Product>)
                }

            </div>

            <div className="cart-container">
                <h3>Shopping Cart</h3>
                <Cart cart={cart}></Cart>

            </div>



        </div>
    );
};

export default Shop;