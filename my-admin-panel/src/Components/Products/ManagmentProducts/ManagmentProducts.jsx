import manageAvatar from "../../../assets/icons/setting-3.svg";
import { useTitle } from "../../../Hooks/useTitle";
import { useState } from "react";

import styles from "./MangementProducts.module.css";

function AddProductModal({ onClose, onAdd }) {
  useTitle("Products : Add Products");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    onAdd(newProduct);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>ایجاد محصول جدید</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>نام کالا </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="نام کالا"
            />
          </div>
          <div>
            <label>تعداد موجودی </label>
            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              type="number"
              placeholder="تعداد"
              step="1"
            />
          </div>
          <div>
            <label>قیمت</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="قیمت"
              step="0.01"
            />
          </div>
          <div className={styles.modalButtons}>
            <button className={styles.submit} type="submit">
              ایجاد
            </button>
            <button className={styles.cancle} type="button" onClick={onClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ManagmentProducts({ onAdd }) {
  const [showModal, setShowModal] = useState(false);

  const addHandler = () => setShowModal(true);
  const closeHandler = () => setShowModal(false);

  const handleProductAdd = (newProduct) => {
    onAdd(newProduct);
    closeHandler();
  };

  return (
    <div className={styles.ManagmentProducts}>
      <div className={styles.Managment}>
        <img src={manageAvatar} alt="لوگو" />
        <h1>مدیریت کالا</h1>
      </div>
      <div className={styles.button}>
        <button onClick={addHandler}>افزودن محصول</button>
      </div>

      {showModal && (
        <AddProductModal onClose={closeHandler} onAdd={handleProductAdd} />
      )}
    </div>
  );
}

export default ManagmentProducts;
