export default function Cart({ cart }) {
  return (
    <section className="book-container">
      <header className="detail-header">
        <h2>Your Cart</h2>
      </header>
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
    </section>
  );
}
