import Navbar from "./Navbar";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function Header() {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Welcome To The Book Store!");
    }
    if (location.pathname.startsWith("/detail")) {
      setTitle("Book Detail");
    }
    if (location.pathname.startsWith("/cart")) {
      setTitle("Your Cart");
    }
  }, [location.pathname]);

  return (
    <header>
      <h2>{title}</h2>
      <Navbar />
    </header>
  );
}
