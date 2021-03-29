import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProductDb = () => {
        fetch('http://localhost:5000/addProducts', {
            method: 'POST',
            headers: {'Content-Type': 'Application/Json'},
            body: JSON.stringify(fakeData)
        })
    }

    return (
        <div>
            <button onClick={handleAddProductDb}>Add Product</button>
        </div>
    );
};

export default Inventory; 