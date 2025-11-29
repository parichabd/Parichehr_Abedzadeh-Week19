import manageAvatar from "../../../assets/icons/setting-3.svg"

import styles from "./MangementProducts.module.css"
function ManagmentProducts() {
    const addHandler = () => {

    }
  return (
    <div className={styles.ManagmentProducts}>
        <div className={styles.Managment}>
            <img src={manageAvatar} alt="لوگو" />
            <h1>مدیریت کالا</h1>
        </div>
        <div className={styles.button}>
            <button onClick={addHandler}>افزودن محصول</button>
        </div>
    </div>
  )
}

export default ManagmentProducts