import { useAppContext } from "../context/useAppContext";
import { formatRupiah } from "../utils/formarRupiah";

export default function Cart() {
  const { state, dispatch } = useAppContext();

  const { cart } = state;
  return (
    <section className="cart-container">
      <div className="books-item"></div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>cart is empty</p>
        </div>
      ) : (
        cart.map((item, index) => (
          <ul className="list-cart" key={index}>
            <li className="item-list">
              <img className="cart-img" src={item.img} alt={item.title} />
              <span>
                {item.title.length > 20
                  ? item.title.slice(0, 20) + "..."
                  : item.title}
              </span>
            </li>
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
        ))
      )}
    </section>
  );
}
