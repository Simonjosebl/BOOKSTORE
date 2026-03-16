import React from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from '../../assets/styles/Header.module.scss';
import logo from '../../assets/images/Logo.png';

const Header = () => {
  const userEmail = "usuario@booknest.com";
  const navigate = useNavigate();

  return (
    <header className={styles.header}>

      <Link to="/">
        <img src={logo} alt="Booknest Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Shop">Shop</Link>
        <Link to="/YourCart">Your Cart</Link>
      </nav>

      <div className={styles.userSection}>
      <button 
        type="button"
        className={styles.notificationButton}
        onClick={() => navigate('/Notifications')}
        aria-label="Notificaciones" 
        >
        <FiBell size={20} />
        </button>
        
        <div 
          className={styles.userInfo }
          onClick={() => navigate('/Client')} 
          style={{ cursor: 'pointer' }} 
        >
          <FiUser size={20} />
          <span className={styles.userEmail}>{userEmail}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;