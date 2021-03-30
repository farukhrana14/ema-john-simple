import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('https://emajohn-server.herokuapp.com/products')
        .then(res=> res.json())
        .then(data => setProducts(data))

    } ,[])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log('Products:', products, 'Keys:', productKeys);
        fetch('https://emajohn-server.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => console.log(data))

    }, [])



    const handlerAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key === toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);

        // console.log(product);
    }


    return (

        <div className='twin-container'>
            <div className="product-container">

                {
                    products.map(product => <Product key={product.key} showAddToCart={true} handlerAddProduct={handlerAddProduct} product={product}></Product>)
                }

            </div>

            <div className="cart-container">
                <h3>Shopping Cart</h3>
                <Cart cart={cart}>
                    
                    <Link to='/review'>
                        <button className='main-button'> Review Order </button>
                    </Link>
                </Cart>

            </div>



        </div>
    );
};

export default Shop;