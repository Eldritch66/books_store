import { Link, useLocation } from "react-router";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBackspace } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      {location.pathname === "/cart" ? (
        // Kalau di halaman cart → tampilkan tombol back ke Home
        <Link to="/" className="openCart">
          <FaBackspace />
        </Link>
      ) : (
        // Kalau di halaman lain → tampilkan icon cart
        <Link to="/cart" className="openCart">
          <MdOutlineShoppingCart />
        </Link>
      )}
    </nav>
  );
}
