import { BrowserRouter, Route, Routes } from "react-router";
import { AppProvider } from "./contexts/UseContext";
// import BookContainer from "./pages/BookContainer";
// import Detail from "./pages/DetailBook";
// import Cart from "./pages/Cart";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import BookLoader from "./components/BookLoader";

const Detail = lazy(() => import("./pages/DetailBook"));
const BookContainer = lazy(() => import("./pages/BookContainer"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Suspense fallback={<BookLoader />}>
          <Routes>
            <Route path="/" element={<BookContainer />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
