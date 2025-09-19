import { useAppContext } from "../contexts/useAppContext";
import { formatRupiah } from "../utils/formarRupiah";
import { Link } from "react-router";

export default function Cart() {
  const { state, dispatch } = useAppContext();
  const { cart } = state;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const shipping = 19000;
  const total = subtotal + shipping;
  return (
    <section className="cart-container">
      <div className="books-item"></div>
      {cart.length > 0 &&
        cart.map((item, index) => (
          <ul className="list-cart" key={index}>
            <Link to={`/detail/${item.id}`} className="no-list-style">
              <li className="item-list">
                <img className="cart-img" src={item.img} alt={item.title} />
                <span>
                  {item.title.length > 20
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </span>
              </li>
            </Link>
            <span>{formatRupiah(item.price * item.qty)}</span>

            <div className="amountAndCheckOut">
              <div className="buttonAmount">
                <button
                  onClick={() => dispatch({ type: "decQty", payload: item })}
                >
                  -
                </button>

                <strong>{item.qty}</strong>
                <button
                  onClick={() => dispatch({ type: "incQty", payload: item })}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="delete-item"
              onClick={() => dispatch({ type: "deleteItem", payload: item.id })}
            >
              &times;
            </button>
          </ul>
        ))}
      {cart.length > 0 && (
        <div className="price-items">
          <div className="sub-price-items">
            <span className="sub-total">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </span>
            <span className="shipping">
              <span>Shipping </span>
              <span>{formatRupiah(shipping)}</span>
            </span>
          </div>
          <hr className="line-price" />
          <div className="total-price">
            <span className="span-total-price">
              <strong>Total</strong>
              <span>{formatRupiah(total)}</span>
            </span>
            <button className="check-out">Check Out</button>
          </div>
        </div>
      )}
    </section>
  );
}
