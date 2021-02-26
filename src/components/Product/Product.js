import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    // console.log(props);
    const{img, name, seller, price, stock} = props.productData;
    return (
        <div className='product'>
            
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
                <h4 className='product-name'>{name}</h4>
                <br/>
                <p>by: <small>{seller} </small></p>
                <br/>
                <p>$ {price}</p>
                
                <p> <small>Only {stock} left in stock - order soon</small></p>
                <button className='main-button' onClick={()=> props.handlerAddProduct(props.productData)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>

        </div>
    );
};

export default Product;