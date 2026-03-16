import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../assets/styles/Shop.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/common/Layout';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [genre, setGenre] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const userId = 1;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8074/books');
        setBooks(response.data as any[]);
      } catch (err) {
        setError('Error loading books from API');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesGenre = genre ? book.genre === genre : true;
    const matchesAuthor = author ? book.author?.toLowerCase().includes(author.toLowerCase()) : true;
    const matchesYear = year ? book.year?.toString().includes(year) : true;
    const matchesPrice = (() => {
      if (!priceRange) return true;
      const [min, max] = priceRange.split('-').map(Number);
      return book.price >= min && book.price <= max;
    })();
    const matchesSearch = searchQuery
      ? book.title.toLowerCase().includes(searchQuery) || book.isbn?.includes(searchQuery)
      : true;

    return matchesGenre && matchesAuthor && matchesYear && matchesPrice && matchesSearch;
  });

  const handleAddToCart = async (bookId: number) => {
    const selectedBook = books.find((book) => book.id === bookId);
    if (!selectedBook) return;

    try {
      const response = await axios.post(`http://localhost:8074/api/cart/${userId}/add`, null, {
        params: {
          bookId: selectedBook.id,
          quantity: 1,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        alert(`"${selectedBook.title}" added to cart!`);
      } else {
        alert('Failed to add book to cart. Try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart.');
    }
  };

  return (
    <Layout>
      <div className={styles.shopPage}>
        <aside className={styles.filters}>
          <h3>Filter by:</h3>

          <label>
            Genre:
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">All</option>
              <option value="Fiction">Fiction</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Romance">Romance</option>
            </select>
          </label>

          <label>
            Price:
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">All</option>
              <option value="0-20000">$0 - $20,000</option>
              <option value="20000-40000">$20,000 - $40,000</option>
              <option value="40000-60000">$40,000 - $60,000</option>
            </select>
          </label>

          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author's name"
            />
          </label>

          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Example: 1945"
            />
          </label>
        </aside>

        <main className={styles.bookList}>
          <h2>Explore All Books Here</h2>

          {loading ? (
            <p>Loading books...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.books}>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className={styles.bookCard}
                    onClick={() => navigate(`/book/${book.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={
                        book.imageUrl
                          ? `https://bookshopimages.blob.core.windows.net/book-images/${book.imageUrl}`
                          : 'https://via.placeholder.com/150'
                      }
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                    <p>{book.genre || 'Unknown'} • {book.year || 'N/A'}</p>
                    <p>${book.price?.toLocaleString()}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(book.id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <p>No books were found with those filters.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Shop;
