import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/Client.module.scss';
import { FaUser, FaCity, FaGlobe, FaVenusMars, FaBriefcase, FaCreditCard } from 'react-icons/fa';
import { MdOutlineCalendarToday } from 'react-icons/md';
import Layout from '../../components/common/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ClientResponse {
  name: string;
  city: string;
  country: string;
  age: number;
  gender: string;
  profession: string;
  card?: {
    cardNumber: string;
  };
}

const Client: React.FC = () => {
  const navigate = useNavigate();
  const userId = 1;

  const [clientData, setClientData] = useState({
    name: '',
    city: '',
    country: '',
    age: '',
    gender: '',
    profession: '',
    card: '',
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const res = await axios.get<ClientResponse>(`http://localhost:8074/users/${userId}`);

        setClientData({
          name: res.data.name || '',
          city: res.data.city || '',
          country: res.data.country || '',
          age: res.data.age ? String(res.data.age) : '',
          gender: res.data.gender || '',
          profession: res.data.profession || '',
          card: res.data.card?.cardNumber || '',
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };
    fetchClientData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('clientData', JSON.stringify(clientData));
    alert('Client data updated!');
  };

  const HandleCard = () => {
    navigate('/Card');
  };

  const handleLogOut = () => {
    navigate('/Login');
  };

  return (
    <Layout>
      <div className={styles.clientContainer}>
        <h2>Client Details</h2>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <FaUser />
            <input type="text" name="fullName" placeholder="Full Name" value={clientData.name} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <FaCity />
            <input type="text" name="city" placeholder="City" value={clientData.city} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <FaGlobe />
            <input type="text" name="country" placeholder="Country" value={clientData.country} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <MdOutlineCalendarToday />
            <input type="number" name="age" placeholder="Age" value={clientData.age} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <FaVenusMars />
            <input type="text" name="sex" placeholder="Sex" value={clientData.gender} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <FaBriefcase />
            <input type="text" name="profession" placeholder="Profession" value={clientData.profession} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <FaCreditCard />
            <input type="text" name="card" placeholder="5306-587-4318" value={clientData.card} readOnly />
          </div>
          <button className={styles.cardButton} onClick={HandleCard}>Recharge Card</button>
        </div>
        <button className={styles.saveButton} onClick={handleSave}>Update Info</button>
        <button className={styles.LogOutButton} onClick={handleLogOut}>Login Out</button>
      </div>
    </Layout>
  );
};

export default Client;
