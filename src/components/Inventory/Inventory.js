import React from 'react';
import './Inventory.css';


const Inventory = () => {

    const handleAddProductDb = () => {

        const product = {};

        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {'Content-Type': 'Application/Json'},
            body: JSON.stringify(product)
        })
    }

    return (
        <div className='inventory-main-div'>
            <form onSubmit={handleAddProductDb}>
                <p><span>Name:</span> <input type="text"/></p>
                <p><span>Price:</span> <input type="text"/></p>
                <p><span>Quantity</span> <input type="text"/></p>
                <p><span>Product Image:</span> <input type="file"/></p>


               <button onClick={handleAddProductDb}>Add Product</button>

            </form>

        </div>
    );
};

export default Inventory; 