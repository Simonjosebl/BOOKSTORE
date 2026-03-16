import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/PaymentSuccess.module.scss';
import axios from 'axios';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionSaved, setTransactionSaved] = useState(false);


  const userId = localStorage.getItem('userId') || '1'; 

  useEffect(() => {
    const sendTransaction = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8074/api/transactions/checkout/${userId}`
        );

        if (response.status === 200) {
          console.log('Transacción registrada correctamente:', response.data);
          setTransactionSaved(true);
        } else {
          setError('Error al registrar la transacción');
        }
      } catch (err) {
        console.error('Error al conectar con el backend:', err);
        setError('No se pudo registrar la transacción');
      } finally {
        setLoading(false);
      }
    };

    sendTransaction();
  }, [userId]);

  return (
    <Layout>
      <div className={styles.successContainer}>
        {loading ? (
          <p>Procesando tu transacción...</p>
        ) : error ? (
          <>
            <h2>Ocurrió un problema</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/shop')}>Volver a la tienda</button>
          </>
        ) : transactionSaved ? (
          <>
            <h2>¡Pago exitoso!</h2>
            <p>Gracias por tu compra. Tu pedido ha sido registrado correctamente.</p>
            <button onClick={() => navigate('/shop')}>Seguir comprando</button>
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
