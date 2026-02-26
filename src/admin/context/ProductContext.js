import React, { createContext, useState } from "react";
import initialProducts from "../../data/Products"; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts); 

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]); 
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};