import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect, useReducer } from "react";
import BookContainer from "./pages/BookContainer";
import Detail from "./pages/DetailBook";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

const initialState = {
  dataBook: [],
  isCartOpen: false,
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, dataBook: action.payload };
    case "openCart":
      return { ...state, isCartOpen: !state.isCartOpen };
    case "handleDetail": {
      if (state.selectBook === action.payload.id) {
        return { ...state, selectBook: null, detail: null };
      }
      return {
        ...state,
        selectBook: action.payload.id,
        detail: action.payload,
      };
    }
    case "handleCart": {
      const existing = state.cart.find((item) => item.id === state.detail.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === state.detail.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...state.detail, qty: 1 }] };
    }
  }
}

function App() {
  const [{ dataBook, isCartOpen, cart }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <header>
        <h1>Welcome To Book Store</h1>
        <Navbar />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <BookContainer
              isCartOpen={isCartOpen}
              cart={cart}
              dataBook={dataBook}
              dispatch={dispatch}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={<Detail dataBook={dataBook} dispatch={dispatch} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
