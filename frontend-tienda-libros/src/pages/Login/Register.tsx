import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/Register.module.scss';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [FirstName, setFirstName] = useState('');
      const [LastName, setLastName] = useState('');
      const navigate = useNavigate();
    
      const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (email && password && FirstName && LastName) {
          navigate('/Login '); 
        } else {
          alert('Please enter email, password and name.');
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
        <h3>Create an Account!</h3>
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
          <div className={styles.inputGroup}>
            <FiUser />
            <input
              type="First Name"
              placeholder="Enter First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <FiUser/>
            <input
              type="Last Name"
              placeholder="Enter Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
          
          <button type="submit">Register</button>
        </form>
        
      </div>
    </div>
    );
};

export default Register;