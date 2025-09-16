import { useReducer } from "react";
import { BookContext } from "./bookContext";

const initialState = {
  dataBook: [],
  isCartOpen: false,
  cart: [],
};

function reducer(state, action) {
  console.log("Reducer called with:", action);

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

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}
