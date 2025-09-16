import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import BookContainer from "./pages/BookContainer";
import Detail from "./pages/DetailBook";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useAppContext } from "./context/useAppContext";

function App() {
  const { dispatch } = useAppContext();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        console.log("Fetched data:", data);

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <header>
        <h1>Welcome To Book Store</h1>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<BookContainer />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
