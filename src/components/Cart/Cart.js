import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);

    const totalPrice = cart.reduce((total, pd) => total + pd.price, 0);

    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    }
    else if (totalPrice > 15) {
        shipping = 4.99;
    }
    else if (totalPrice > 0) {
        shipping = 12.99;
    }


    const tax = (totalPrice * 0.1);
    const allTotal = (totalPrice + shipping + Number(tax));

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div className='cart-area'>

            <div className='summary-area'>
                <h4>Order Summary</h4>
                <h5>Items Ordered: {cart.length}</h5>
            </div>

            
            <table className='priceTable'>
                <tbody>
                    <tr>
                        <td> Product price:</td>
                        <td className='priceValue'>{formatNumber(totalPrice)}</td>
                    </tr>
                    <tr>
                        <td>Shipping Cost:</td>
                        <td className='priceValue'>{shipping}</td>
                    </tr>
                    <tr>
                        <td>Tax + VAT: </td>
                        <td className='priceValue'>{formatNumber(tax)}</td>
                    </tr>
                    <tr>
                        <td>Total Price: </td>
                        <td className='priceValue'>{formatNumber(allTotal)}</td>
                    </tr>
                </tbody>
            </table>

            {/* <div className='price-area'><p> <small>Product price: <span className='price-value'>{totalPrice}</span></small></p>
                <p><small>Shipping Cost: <span className='price-value'>{shipping}</span></small></p>
                <p><small>Tax + VAT: <span className='price-value'>{formatNumber(tax)}</span></small></p>
                <p><small>Total Price: <span className='price-value'>{formatNumber(allTotal)}</span></small></p>

            </div> */}


        </div>
    );
};

export default Cart;