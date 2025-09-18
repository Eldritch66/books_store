import { useReducer, useEffect } from "react";
import { BookContext } from "./bookContext";

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
      if (!state.cart) return state;
      const book = action.payload;

      const existing = state.cart.find((item) => item.id === book.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === book.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...book, qty: 1 }],
      };
    }
    case "incQty": {
      const incItem = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          incItem.id === item.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    }

    case "decQty": {
      const decItem = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          decItem.id === item.id
            ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
            : item
        ),
      };
    }

    case "deleteItem": {
      const cartDelete = state.cart.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        cart: cartDelete,
      };
    }
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        // console.log("Fetched data:", data);

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}
