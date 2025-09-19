import { Link } from "react-router";
import { useAppContext } from "../contexts/useAppContext";

export default function BookContainer() {
  const { state } = useAppContext();
  const { isLoading } = state;

  return (
    <>
      <section className="book-container">
        {isLoading ? (
          <div>
            <span style={{ fontSize: "3rem", fontFamily: "monospace" }}>
              Loading...
            </span>
          </div>
        ) : (
          state.dataBook.map((book) => (
            <Link
              className="list-style"
              to={`/detail/${book.id}`}
              key={book.id}
            >
              <ul className="book-list">
                <li>
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
            </Link>
          ))
        )}
      </section>
      <hr />
    </>
  );
}
