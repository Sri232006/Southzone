import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  // API fetch
  useEffect(() => {

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

  }, []);

  const addProduct = (product) => {

    const newProduct = {
      ...product,
      id: Date.now()
    };

    setProducts((prev) => [...prev, newProduct]);

  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};