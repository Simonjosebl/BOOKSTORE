import React, { useState } from 'react';
import styles from '../../assets/styles/Login.module.scss';
import { FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      navigate('/'); 
    } else {
      alert('Please enter email and password.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftImage}></div>
      <div className={styles.rightForm}>
        <h2>Welcome to <span>BookNest</span></h2>
        <p>
          Explore a world of books with BookNest. Enjoy a seamless shopping experience,
          unlock exclusive perks, and get the best deals on your next great read.
        </p>
        <h3>Login to Your Account!</h3>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <FiMail />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <FiLock />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.links}>
            <a href="#">Forgot Password?</a>
          </div>
          <p className={styles.footerText}>
            Don’t you have an account?{' '}
            <a href="#" onClick={(e) => {
                e.preventDefault();
                navigate('/Register');
            }}>
                <strong>Create an account</strong>
            </a>
            </p>
          <button type="submit">Sign In</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
