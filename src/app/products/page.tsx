"use client";

import React from "react";
import { useEffect, useState } from "react";

async function Products() {
  type product = {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    id: string;
  };
  const [products, setProducts] = useState<Array<product>>([]);

  useEffect(() => {
    console.log("products page");
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/products");
      const { data } = await res.json();
      setProducts(data);
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <div className="bg-white w-full">
      <h1>Products</h1>

      {products.map((product) => {
        return (
          <div key={product.id}>
            <h1>
              {product.title} - {product.price}
            </h1>
            <img src={product.thumbnail} alt={product.title} />
          </div>
        );
      })}
    </div>
  );
}

export default Products;
