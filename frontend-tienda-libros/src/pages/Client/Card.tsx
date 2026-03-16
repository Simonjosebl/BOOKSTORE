import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/Payment.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiver: '',
    billing: '',
    sending: '',
    province: '',
    contact: '',
    card: '',
    amount: '',
  });

  const [error, setError] = useState<string>(''); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      // Limpiar el valor para obtener solo números y puntos
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

      if (numericValue < 50000 || numericValue > 200000) {
        setError('El monto debe estar entre 50,000 y 200,000.');
      } else {
        setError('');
      }

      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayNow = async () => {
    if (error) return;

    const numericAmount = parseFloat(formData.amount.replace(/[^0-9.]/g, ''));

    if (isNaN(numericAmount)) {
      setError('El monto debe ser un número válido.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Payload para backend con userId y cardId fijos en 1
      const payload = {
        userId: 1,
        cardId: 1,
        amount: numericAmount,
      };

      await axios.post('http://localhost:8074/recharges', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      navigate('/Success');
    } catch (err) {
      setLoading(false);
      setError('Error al procesar el pago. Intente nuevamente.');
      console.error(err);
    }
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <Layout>
      <div className={styles.paymentPage}>
        <h2>Checkout & Payment</h2>

        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
              <input type="text" name="card" value={formData.card} onChange={handleChange} />
            </label>

            <label>
              Amount Recharge
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="50,000.00"
              />
            </label>
            
            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.buttons}>
              <button type="button" onClick={handlePayNow} disabled={loading}>
                {loading ? 'Procesando...' : 'Pay Now'}
              </button>
              <button type="button" onClick={handleClose} className={styles.closeBtn}>
                Close Checkout Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Card;
