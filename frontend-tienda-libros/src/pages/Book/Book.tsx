import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../assets/styles/Book.module.scss';
import Layout from '../../components/common/Layout';

interface Book {
  id: number;
  title: string;
  isbn: string;
  price: number;
  availableUnits: number;
  imageUrl?: string;
  status: string;
  createdAt: string;
  [key: string]: any;
}

const Book: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [book, setBook] = React.useState<Book | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) {
      setError('No book ID provided');
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(`http://localhost:8074/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError('Book not found or API error');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const userId = 1;

  const handleAddToCart = async () => {
    if (!book) return;

    try {
      const response = await axios.post(`http://localhost:8074/api/cart/${userId}/add`, null, {
        params: {
          bookId: book.id,
          quantity: 1,
        },
      });

      console.log('Response from API:', response); 

      if (response.status >= 200 && response.status < 300) {
        alert(`"${book.title}" added to cart!`);
      } else {
        console.warn('Unexpected response:', response);
        alert('Failed to add book to cart. Try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart.');
    }
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>{error}</div></Layout>;
  if (!book) return <Layout><div>Book not found</div></Layout>;

  return (
    <Layout>
      <div className={styles.bookDetail}>
        <div className={styles.leftPanel}>
          <h1>{book.title}</h1>
          <h3>Status: {book.status}</h3>
          <p><strong>Available Units:</strong> {book.availableUnits}</p>
          <p><strong>Created At:</strong> {new Date(book.createdAt).toLocaleString()}</p>
        </div>

        <div className={styles.bookImageWrapper}>
          <img
            src={book.imageUrl
              ? `https://bookshopimages.blob.core.windows.net/book-images/${book.imageUrl}`
              : 'https://via.placeholder.com/150'
            }
            alt={book.title}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.emptyColumn}></div>
          <div className={styles.contentColumn}>
            <div className={styles.category}>
              <span>📘</span> <strong>ISBN:</strong> {book.isbn}
            </div>

            <div className={styles.priceSection}>
              <span>💰</span>{' '}
              <span className={styles.price}>${book.price?.toLocaleString()}</span>
            </div>

            <button
              className={styles.cartButton}
              onClick={handleAddToCart}
              disabled={book.availableUnits <= 0}
            >
              {book.availableUnits > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Book;
