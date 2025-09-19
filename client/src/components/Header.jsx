import Navbar from "./Navbar";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { useAppContext } from "../contexts/useAppContext";

export default function Header() {
  const [title, setTitle] = useState("");
  const location = useLocation();
  const { state } = useAppContext();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle(
        <>
          <h2 className={styles["title-h2"]}>BOOK TOLSTOY</h2>
          <p className="subtitle">online shop alternative literatur</p>
        </>
      );
    }
    if (location.pathname.startsWith("/detail")) {
      setTitle(
        <>
          <h2>DETAIL</h2>
        </>
      );
    }
    if (location.pathname.startsWith("/cart")) {
      setTitle(
        <>
          {state.cart.length === 0 ? (
            <h2>YOUR CART IS EMPTY!</h2>
          ) : (
            <h2>CART</h2>
          )}
        </>
      );
    }
  }, [location.pathname, state]);

  return (
    <>
      <header className={styles["header"]}>
        <main className={styles["main-title"]}>{title}</main>
      </header>
      <Navbar />
    </>
  );
}
