import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);

    const totalPrice = cart.reduce( (total, pd) => total + pd.price, 0);

    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    } 
    else if (totalPrice > 15) {
        shipping = 4.99;
    } 
    else if (totalPrice > 0){
        shipping = 12.99;
    }
    

    const tax = (totalPrice * 0.1);
    const allTotal = (totalPrice + shipping + Number(tax));
    
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <h5>Items Ordered: {cart.length}</h5>
            <p> <small>Product price: {totalPrice} </small></p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p><small>Total Price: {formatNumber(allTotal)}</small></p>


        </div>
    );
};

export default Cart;