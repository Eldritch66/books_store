import { useParams } from "react-router";
import { FaCartArrowDown } from "react-icons/fa6";
import { useAppContext } from "../contexts/useAppContext";
import { useState } from "react";
import { formatRupiah } from "../utils/formarRupiah";

export default function Detail() {
  const { state, dispatch } = useAppContext();
  const [isModal, setModal] = useState(false);
  const { id } = useParams();
  // const dataBook = state.dataBook;
  const { dataBook } = state;

  const bookInfo = dataBook.find((book) => book.id.toString() === id);

  if (!bookInfo) {
    return <p>Loading book detail...</p>;
  }

  return (
    <>
      <div className={`modal-${isModal ? "show" : "hide"}`}>
        <div className="modal-content">
          <button
            className="modal-button-close"
            onClick={() => setModal(!isModal)}
          >
            &times;
          </button>
          <div className="modalTitle">
            <strong>Book: </strong>
            <h4>
              {bookInfo.title.length > 20
                ? bookInfo.title.slice(0, 20) + "..."
                : bookInfo.title}
              <br />
            </h4>
            <hr className="lineModal" />
            <span className="nontificationModal">already add to cart!</span>
          </div>
        </div>
      </div>
      <header className="detail-header">
        <h2>{bookInfo.title}</h2>
      </header>
      <div className="detail-container">
        <div className="detail-img">
          <img src={bookInfo.img} alt="" />
        </div>
        <div className="detail-info">
          <span className="span-detail">
            <strong>
              Author: <br />
            </strong>
            {bookInfo.author}
          </span>
          <span className="span-detail">
            <strong>
              Genre: <br />
            </strong>
            {bookInfo.genre}
          </span>
          <span className="span-detail">
            <strong>
              Release: <br />
            </strong>
            {bookInfo.release_date}
          </span>
          <span className="span-detail">
            <strong>
              Summary: <br />
            </strong>
            <p>{bookInfo.summary}</p>
          </span>

          <span className="price-detail-book">
            <strong>Price: </strong>
            <p>{formatRupiah(bookInfo.price)}</p>
          </span>
        </div>

        <button
          className="addToCart"
          onClick={() => {
            setModal(true);
            dispatch({ type: "handleCart", payload: bookInfo });
          }}
        >
          <FaCartArrowDown />
        </button>
      </div>
    </>
  );
}
