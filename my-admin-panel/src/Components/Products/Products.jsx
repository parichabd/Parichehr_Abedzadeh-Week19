import SearchBar from "./SearchBar";

import styles from "./Products.module.css"

function Products() {

  return (
    <div className={styles.products}>
      <SearchBar />
    </div>
  );
}

export default Products;
