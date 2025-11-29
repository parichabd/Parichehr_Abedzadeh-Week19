import SearchBar from "./SearchBar/SearchBar";

import styles from "./Products.module.css"
import ManagmentProducts from "./ManagmentProducts/ManagmentProducts";

function Products() {

  return (
    <div className={styles.products}>
      <SearchBar />
      <ManagmentProducts/>
    </div>
  );
}

export default Products;
