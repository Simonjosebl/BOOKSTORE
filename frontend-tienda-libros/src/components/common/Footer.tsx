import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from '../../assets/styles/Home.module.scss';

const Footer = () => {
  return (
    <footer className={styles.homeFooter}>
      <p>Make your first purchase today and join our community of passionate readers!</p>
      <h6>© 2025 - BookHost</h6>
      
      <div className={styles.socialIcons}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
