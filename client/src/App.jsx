import { BrowserRouter, Route, Routes } from "react-router";
import { AppProvider } from "./contexts/UseContext";
import BookContainer from "./pages/BookContainer";
import Detail from "./pages/DetailBook";
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BookContainer />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
