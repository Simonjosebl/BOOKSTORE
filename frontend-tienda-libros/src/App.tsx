import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Book from './pages/Book/Book';
import About from './pages/About/About';
import YourCart from './pages/YourCart/YourCart';
import Payment from './pages/Payment/Payment';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import Notifications from './pages/Notificactions/Notifications';
import Client from './pages/Client/Client';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Card from './pages/Client/Card';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/About" element={<About />} />
          <Route path="/YourCart" element={<YourCart />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Success" element={<PaymentSuccess />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Client" element={<Client />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Card" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;