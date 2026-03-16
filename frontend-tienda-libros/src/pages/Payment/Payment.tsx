import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/Payment.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

const Payment: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    receiver: '',
    billing: '',
    sending: '',
    province: '',
    contact: '',
    card: '',
  });
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
  const fetchCartAndCard = async () => {
    try {
      const [cartRes, cardRes] = await Promise.all([
        axios.get<CartItem[]>(`http://localhost:8074/api/cart/${userId}`),
        axios.get<{ cardNumber: string }>(`http://localhost:8074/cards/${userId}`)  
      ]);

      setCartItems(cartRes.data);

      if (cardRes.data.cardNumber) {
        setFormData(prev => ({ ...prev, card: cardRes.data.cardNumber }));
      }
    } catch (err) {
      console.error('Error al cargar carrito o tarjeta:', err);
    }
  };
  fetchCartAndCard();
}, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayNow = async () => {
    try {
      for (const item of cartItems) {
        const purchaseData = {
          userId,
          bookId: item.id,
          quantity: item.quantity,
          totalAmount: item.price * item.quantity,
        };

        const res = await axios.post('http://localhost:8074/purchases', purchaseData);

        if (res.status !== 201 && res.status !== 200) {
          throw new Error(`Error comprando "${item.title}"`);
        }
      }

      navigate('/Success');
    } catch (error) {
      alert('Error durante el pago: ' + (error as Error).message);
    }
  };

  return (
    <Layout>
      <div className={styles.paymentPage}>
        <h2>Checkout & Payment</h2>

        <div className={styles.wrapper}>
          <form className={styles.form}>
            <label>
              Receiver Name
              <input type="text" name="receiver" value={formData.receiver} onChange={handleChange} />
            </label>

            <label>
              Billing Address
              <input type="text" name="billing" value={formData.billing} onChange={handleChange} />
            </label>

            <label>
              Sending Address
              <input type="text" name="sending" value={formData.sending} onChange={handleChange} />
            </label>

            <label>
              Select Province
              <select name="province" value={formData.province} onChange={handleChange}>
                <option value="">Select</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Colombia">Colombia</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Contact Number
              <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
            </label>

            <label>
              Card Number
              <input type="text" name="card" value={formData.card} readOnly />
            </label>

            <div className={styles.buttons}>
              <button type="button" onClick={handlePayNow}>Pay Now</button>
              <button type="button" onClick={() => navigate(-1)} className={styles.closeBtn}>
                Close Checkout Page
              </button>
            </div>
          </form>

          <div className={styles.summary}>
            <h3>Your Order Summary</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cartItems.map(item => (
                    <li key={item.id}>
                      <span>{item.title} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.total}>Total: ${total.toLocaleString()}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
