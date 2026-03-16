import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/Notifications.module.scss';

interface Order {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
  status: string;
}

const Notifications: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = 1; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8074/purchases/${userId}`);
        const purchases = res.data as any[];

        const formattedOrders: Order[] = purchases.map((purchase: any) => ({
          id: purchase.id,
          title: purchase.book?.title || 'Unknown Title',
          author: purchase.book?.author || 'Unknown Author',
          price: purchase.book?.price || 0,
          image: purchase.book?.image || '/default.jpg',
          quantity: purchase.quantity,
          status: purchase.status,
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching purchases:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Layout>
      <div className={styles.notificationPage}>
        <h2 className={styles.title}>Notifications for User ID: {userId}</h2>
        <div className={styles.orderList}>
          {orders.length === 0 ? (
            <p>No purchases found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className={styles.orderItem}>
                <img src={order.image} alt={order.title} />
                <div className={styles.orderInfo}>
                  <strong>{order.title}</strong>
                  <p>{order.author}</p>
                  <p>${(order.price * order.quantity).toFixed(2)} ({order.quantity})</p>
                </div>
                <p className={styles.status}>Status: {order.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
