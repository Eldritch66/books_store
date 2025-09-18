import { BrowserRouter, Route, Routes } from "react-router";
import BookContainer from "./pages/BookContainer";
import Detail from "./pages/DetailBook";
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BookContainer />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
