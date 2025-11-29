import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ManagmentProducts from "./ManagmentProducts/ManagmentProducts";
import ProductsTable from "./ProductsTable/ProductsTable";

import styles from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || data))
      .catch((err) => console.error(err));
  }, []);


  const handleAddProduct = (newProduct) => {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error("خطا در ثبت محصول");
        return res.json();
      })
      .then((addedProduct) => {
        setProducts((prev) => [...prev, addedProduct]);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={styles.products}>
      <SearchBar />
      <ManagmentProducts onAdd={handleAddProduct} />
      <ProductsTable products={products} />
    </div>
  );
}

export default Products;
