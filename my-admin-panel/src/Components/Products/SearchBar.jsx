import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import AvatarImg from "../../assets/icons/icon-7797704_640.png";

const initialState = {
  query: "",
  user: {
    name: "پریچهر عابدزاده",
    role: "مدیر",
    avatar: AvatarImg,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.value };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
}

function SearchBar({ onSearch = () => {} }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/products");
  }, []);

  const handleSearch = (value) => {
    dispatch({ type: "SET_QUERY", value });
    onSearch(value);
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.searchBox}>
        <span className={styles.icon}>
          <Search size={24} color={"#282828"} />
        </span>

        <input
          type="text"
          placeholder="جستوجو کالا"
          className={styles.input}
          onChange={(e) => handleSearch(e.target.value)}
          value={state.query}
        />
      </div>

      <div className={styles.userBox}>
        <img src={state.user.avatar} alt="" className={styles.avatar} />
        <div className={styles.text}>
          <span className={styles.name}>{state.user.name}</span>
          <span className={styles.role}>{state.user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
