import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ManagmentProducts from "./ManagmentProducts/ManagmentProducts";
import ProductsTable from "./ProductsTable/ProductsTable";
import ConfirmDialog from "./ManagmentProducts/ConfirmDialog";
import { toast, ToastContainer } from "react-toastify";
import { toPersianNumber } from "../../Hooks/usePersianNumber";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = currentPage === 1 ? 6 : 10;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!res.ok) {
          console.error("خطای سرور:", res.status);
          setProducts([]);
          toast.error("خطا در دریافت محصولات");
          return;
        }

        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.data || [];

        if (!Array.isArray(productList)) {
          console.warn("داده دریافتی آرایه نیست:", data);
          setProducts([]);
          return;
        }

        setProducts(productList);
      } catch (err) {
        console.error("خطا در fetch:", err);
        setProducts([]);
        toast.error("خطا در بارگذاری محصولات");
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredProducts.length <= 6 ? 1 : (filteredProducts.length - 6) / 10 + 1
  );

  const indexOfFirstProduct =
    currentPage === 1 ? 0 : 6 + (currentPage - 2) * 10;
  const indexOfLastProduct = currentPage === 1 ? 6 : indexOfFirstProduct + 10;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("ثبت محصول موفق نبود");
      const added = await res.json();
      setProducts((prev) => [...prev, added]);
      toast.success("محصول با موفقیت اضافه شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ثبت محصول");
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const res = await fetch(
        `http://localhost:3000/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (!res.ok) throw new Error("ویرایش موفق نبود");
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      toast.success("ویرایش محصول با موفقیت انجام شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ویرایش محصول");
    }
  };

  const openConfirmDialog = (id) => {
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/products/${productToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status !== 204 && !res.ok) throw new Error("حذف موفق نبود");
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
      toast.success("محصول حذف شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در حذف محصول");
    }
    setConfirmOpen(false);
    setProductToDelete(null);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? styles.active : ""}
          onClick={() => setCurrentPage(i)}
          disabled={i === currentPage}
        >
          {toPersianNumber(i)}
        </button>
      );
    }
    return <div className={styles.pagination}>{buttons}</div>;
  };

  return (
    <div className={styles.products}>
      <SearchBar
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
      />

      <ManagmentProducts onAdd={handleAddProduct} />

      <ProductsTable
        products={currentProducts}
        onEdit={handleEditProduct}
        onDelete={openConfirmDialog}
      />

      {renderPaginationButtons()}

      <ConfirmDialog
        open={confirmOpen}
        message="آیا از حذف این محصول مطمئن هستید؟"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Products;
