import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../services/api";
import CustomButton from "../../../components/CustomButton";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetchBookById(bookId);
        console.log("Fetched Book Response:", response);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error.response || error);
      }
    };

    getBook();
  }, [bookId]);

  if (!book)
    return <p className='text-center text-lg font-semibold'>Loading...</p>;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className='max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-8'>
      <div className='flex-shrink-0 w-50'>
        <img
          src={book.coverImage}
          alt={book.title}
          className='w-50 h-auto rounded-lg shadow-md'
        />
      </div>

      <div className='flex flex-col items-start'>
        <h1 className='text-3xl font-bold text-gray-800'>{book.title}</h1>
        <p className='text-lg text-gray-600 mt-1'>By {book.author.name}</p>

        <p className='mt-2 text-yellow-500 text-lg font-semibold'>
          ⭐ {book.rating} / 5
        </p>

        <div className='flex items-center gap-3 mt-3'>
          <span className='text-2xl font-bold text-gray-900'>
            ${book.price}
          </span>
          {book.discountPrice && (
            <>
              <span className='text-lg text-gray-500 line-through'>
                ${book.discountPrice}
              </span>
              <span className='text-lg font-semibold text-red-500'>
                -
                {Math.round(
                  ((book.discountPrice - book.price) / book.discountPrice) * 100
                )}
                %
              </span>
            </>
          )}
        </div>

        <p className='mt-4 text-gray-700 text-sm'>{book.description}</p>

        <div className='flex items-center gap-4 mt-6'>
          <div className='flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-100'>
            <button
              onClick={decreaseQuantity}
              className='text-lg px-3 py-1 text-gray-700'
            >
              −
            </button>
            <span className='px-4'>{quantity}</span>
            <button
              onClick={increaseQuantity}
              className='text-lg px-3 py-1 text-gray-700'
            >
              +
            </button>
          </div>
        </div>

        <div className='flex gap-4 mt-4'>
          <CustomButton color='gray' icon={<FaHeart />}>
            Add to Wishlist
          </CustomButton>

          <CustomButton color='blue' icon={<FaShoppingCart />}>
            Add to Cart
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
