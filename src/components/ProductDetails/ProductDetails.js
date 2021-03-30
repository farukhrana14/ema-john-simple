import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetails = () => {
  const { productKey } = useParams();
  const [loading, setLoading] =useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch('https://emajohn-server.herokuapp.com/product/'+productKey)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [productKey]);

  return (
    <div>
      <div>
          <h1>Product Detail</h1>
          <h3>Product ID: {productKey}</h3>
       </div>
       {product?.img && (
        
        <div>       
          <Product showAddToCart={false} product={product}></Product>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
