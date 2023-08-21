import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("name");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(["All", ...data]);
        } else {
          setCategories(["All"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Sorting function
  const sortProducts = (attribute) => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (attribute === "price") {
        return a[attribute] - b[attribute];
      } else {
        return a[attribute].localeCompare(b[attribute]);
      }
    });
    setProducts(sortedProducts);
  };

  // Filtering function
  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetch(`http://localhost:5000/api/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        })
        .catch((error) => {
          console.error("Error fetching data for category:", error);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Products List</h1>
      <div className="filters">
        <div className="filter">
          <label htmlFor="categorySelect">Select Category: </label>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => filterProductsByCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="sortSelect">Sort by: </label>
          <select
            id="sortSelect"
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
              sortProducts(e.target.value);
            }}
          >
            <option value="name">Name (A-Z)</option>
            <option value="price">Price (Low to High)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-image">
              <img src={product.images[0]} alt={`Product ${product.id}`} />
            </div>
            <div className="product-info">
              <p className="product-name">{product.title}</p>
              <p className="product-price">${product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
