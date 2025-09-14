import { Link, useLocation } from "react-router";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBackspace } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      {location.pathname === "/cart" ||
      location.pathname.startsWith("/detail") ? (
        //if in cart or detail page, show back button
        <Link to="/">
          <FaBackspace className={styles.openCart} />
        </Link>
      ) : (
        <Link to="/cart">
          <MdOutlineShoppingCart className={styles.openCart} />
        </Link>
      )}
    </nav>
  );
}
