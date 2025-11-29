// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import trashs from "../../../assets/icons/trash.png";
import edit from "../../../assets/icons/edit.png";

import styles from "./ProductsTable.module.css"

function ProductsTable() {
  return (
    <div>
      <table className={styles.TableProducts}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {/* <DotLottieReact
      src="https://lottie.host/c8b9dd91-e7a6-4471-aeae-0f3e99a208cf/ZMMMrVizVu.lottie"
      loop
      autoplay
    /> */}
              <img src={trashs} alt="سطل آشغال" />
              <img src={edit} alt="ویرایش" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
