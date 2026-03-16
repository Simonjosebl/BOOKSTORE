import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/YourCart.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl?: string; 
  quantity: number;
}

const YourCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const userId = 1;

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<CartItem[]>(`http://localhost:8074/api/cart/${userId}`);
      setCartItems(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('No se pudo cargar el carrito. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (bookId: number, delta: number) => {
    const item = cartItems.find(i => i.id === bookId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity === item.quantity) return;

    try {
      await axios.put(`http://localhost:8074/api/cart/${userId}/update`, null, {
        params: { bookId, quantity: newQuantity },
      });
      setCartItems(prev =>
        prev.map(i => (i.id === bookId ? { ...i, quantity: newQuantity } : i))
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('No se pudo actualizar la cantidad. Intenta de nuevo.');
    }
  };

  const handleRemove = async (bookId: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto del carrito?')) return;

    try {
      await axios.delete(`http://localhost:8074/api/cart/${userId}/remove`, {
        params: { bookId },
      });
      setCartItems(prev => prev.filter(item => item.id !== bookId));
    } catch (err) {
      console.error('Error removing item:', err);
      alert('No se pudo eliminar el producto. Intenta de nuevo.');
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('¿Seguro que quieres vaciar el carrito?')) return;

    try {
      await axios.delete(`http://localhost:8097/api/cart/${userId}/clear`);
      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('No se pudo vaciar el carrito. Intenta de nuevo.');
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Función para obtener URL de la imagen, con fallback a placeholder
  const getImageUrl = (imageUrl?: string) =>
    imageUrl
      ? `https://bookshopimages.blob.core.windows.net/book-images/${imageUrl}`
      : 'https://via.placeholder.com/150';

  return (
    <Layout>
      <div className={styles.cartPage}>
        <h2 className={styles.cartTitle}>Your Cart Details</h2>

        {loading && <p>Cargando carrito...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {!loading && cartItems.length === 0 && (
          <p className={styles.emptymessage}>Your cart is empty.</p>
        )}

        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartCard}>
              <img
                src={getImageUrl(item.imageUrl)}
                alt={item.title}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/150';
                }}
              />
              <h4>{item.title}</h4>
              <p>{item.author}</p>
              <p>${item.price.toLocaleString()}</p>

              <div className={styles.pquantity}>
                <p>Quantity:</p>
              </div>

              <div className={styles.quantityControl}>
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity <= 1}
                  aria-label={`Disminuir cantidad de ${item.title}`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  aria-label={`Aumentar cantidad de ${item.title}`}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className={styles.removeBtn}
                aria-label={`Eliminar ${item.title} del carrito`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && !loading && (
          <div className={styles.total}>
            <h3>Total Price: ${totalPrice.toLocaleString()}</h3>
            <button
              onClick={() => navigate('/Payment')}
              className={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClearCart}
              className={styles.clearButton}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default YourCart;
