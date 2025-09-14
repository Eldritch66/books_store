import { useEffect, useReducer } from "react";
import { FaCartArrowDown, FaLessThan } from "react-icons/fa6";
import { FaBackspace } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const initialState = {
  dataBook: [],
  selectBook: null,
  detail: null,
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
  const [{ dataBook, selectBook, detail, isCartOpen, cart }, dispatch] =
    useReducer(reducer, initialState);

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
    <>
      <header>
        <h1>Welcome To Book Store</h1>
      </header>
      {isCartOpen === true ? (
        <FaBackspace
          className="openCart"
          onClick={() => dispatch({ type: "openCart" })}
        />
      ) : (
        <MdOutlineShoppingCart
          className="openCart"
          onClick={() => {
            // setIsCartOpen(true);
            dispatch({ type: "openCart" });
          }}
        />
      )}

      <BookContainer
        isCartOpen={isCartOpen}
        cart={cart}
        dataBook={dataBook}
        dispatch={dispatch}
      />

      <hr />
      <DetailContainer>
        {selectBook && <DetailBook bookInfo={detail} dispatch={dispatch} />}
      </DetailContainer>
    </>
  );
}

function BookContainer({ isCartOpen, cart, dataBook, dispatch }) {
  return (
    <section className="book-container">
      {isCartOpen ? (
        <div className="cart">
          <h2>Cart Items</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  Book Title: {item.title} | quantity:
                  <strong>{item.qty}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        dataBook.map((book) => (
          <ul className="book-list" key={book.id}>
            <li
              onClick={() => dispatch({ type: "handleDetail", payload: book })}
            >
              <main className="book-title">
                {book.title.length > 20
                  ? book.title.slice(0, 20) + "..."
                  : book.title}
              </main>

              <div className="book-img">
                <img src={book.img} alt="" />
              </div>
            </li>
          </ul>
        ))
      )}
    </section>
  );
}

function DetailContainer({ children }) {
  return <>{children}</>;
}

function DetailBook({ bookInfo, dispatch }) {
  return (
    <>
      <header className="detail-header">
        <h2>{bookInfo.title}</h2>
      </header>
      <div className="detail-container">
        <div className="detail-img">
          <img src={bookInfo.img} alt="" />
        </div>
        <div className="detail-info">
          <span>
            Author: <br />
            {bookInfo.author}
          </span>
          <span>
            Genre: <br />
            {bookInfo.genre}
          </span>
          <span>
            Release: <br />
            {bookInfo.release_date}
          </span>
          <p>
            Summary: <br />
            {bookInfo.summary}
          </p>
        </div>

        <button
          className="addToCart"
          onClick={() => dispatch({ type: "handleCart", payload: 1 })}
        >
          <FaCartArrowDown />
        </button>
      </div>
    </>
  );
}

export default App;
