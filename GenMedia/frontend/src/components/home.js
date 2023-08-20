// src/App.js

import React, { useEffect, useState } from 'react';
import './home.css';

const Home=()=> {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <ProductList products={products} />
    </div>
  );
}

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;


