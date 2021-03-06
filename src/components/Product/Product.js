import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const {handlerAddProduct, product} = props;
    const{img, name, seller, price, stock, key} = product;
    const showAddToCart = props.showAddToCart;
    return (
        <div className='product'>
            
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
                <h4 className='product-name'> <Link to = {'/product/'+key}>{name}</Link> </h4>
                <br/>
                <p>by: <small>{seller} </small></p>
                <br/>
                <p>$ {price}</p>
                
                <p> <small>Only {stock} left in stock - order soon</small></p>
            {showAddToCart && <button className='main-button' 
            onClick={()=> handlerAddProduct(product)}>
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>

        </div>
    );
};

export default Product;