import { useEffect } from "react";
import { useState } from "react";
import { FaCartArrowDown, FaLessThan } from "react-icons/fa6";
import { FaBackspace } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

function App() {
  const [databook, setDatabook] = useState([]);
  const [selectBook, setSelectBook] = useState(null);
  const [detail, setDetail] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/books");
      const data = await response.json();
      setDatabook(data);
    }
    fetchData();
  }, []);
  // console.log(databook);

  function handleDetail(book) {
    if (selectBook === book.id) {
      setSelectBook(null);
      setDetail([]);
      return;
    }
    setSelectBook(book.id);
    setDetail(book);
    console.log(book);
  }

  return (
    <>
      <header>
        <h1>Welcome To Book Store</h1>
      </header>

      {isCartOpen === true ? (
        <FaBackspace
          className="openCart"
          onClick={() => setIsCartOpen(false)}
        />
      ) : (
        <MdOutlineShoppingCart
          className="openCart"
          onClick={() => {
            setIsCartOpen(true);
          }}
        />
      )}

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
          databook.map((book) => (
            <ul className="book-list" key={book.id}>
              <li onClick={() => handleDetail(book)}>
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

      <hr />
      <section className="detail-book">
        {selectBook && <DetailBook bookInfo={detail} setCart={setCart} />}
      </section>
    </>
  );
}

function DetailBook({ bookInfo, setCart }) {
  function handleCart(bookInfo) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === bookInfo.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === bookInfo.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      alert(`Book ${bookInfo.title} added to cart`);
      return [...prevCart, { ...bookInfo, qty: 1 }];
    });
  }

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

        <button className="addToCart" onClick={() => handleCart(bookInfo)}>
          <FaCartArrowDown />
        </button>
      </div>
    </>
  );
}

export default App;
