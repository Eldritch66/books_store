import { useParams } from "react-router";
import { FaCartArrowDown } from "react-icons/fa6";

export default function Detail({ dataBook, dispatch }) {
  const { id } = useParams();

  const bookInfo = dataBook.find((book) => book.id.toString() === id);

  if (!bookInfo) {
    return <p>Loading book detail...</p>;
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
