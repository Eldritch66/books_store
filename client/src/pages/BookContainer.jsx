import { Link } from "react-router";

export default function BookContainer({ dataBook, dispatch }) {
  return (
    <>
      <section className="book-container">
        {dataBook.map((book) => (
          <Link className="list-style" to={`/detail/${book.id}`} key={book.id}>
            <ul className="book-list">
              <li
                onClick={() =>
                  dispatch({ type: "handleDetail", payload: book })
                }
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
          </Link>
        ))}
      </section>
      <hr />
    </>
  );
}
