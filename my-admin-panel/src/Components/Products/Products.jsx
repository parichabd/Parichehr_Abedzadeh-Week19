import SearchBar from "./SearchBar/SearchBar";
import ManagmentProducts from "./ManagmentProducts/ManagmentProducts";
import ProductsTable from "./ProductsTable/ProductsTable";

import styles from "./Products.module.css"

function Products() {

  return (
    <div className={styles.products}>
      <SearchBar />
      <ManagmentProducts/>
      <ProductsTable/>
    </div>
  );
}

export default Products;
