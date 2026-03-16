import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import harryPotterImg from '../../assets/images/harry.jpg';
import quixoteImg from '../../assets/images/quixote.webp';
import citiesImg from '../../assets/images/cities.png';
import hobbitImg from '../../assets/images/hobbit.webp';
import BookCarousel from '../../components/common/BookCarousel';
import statsImage from '../../assets/images/stats.png';
import React, { useState } from 'react'; 

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    const trendingBooks = [
        {
          id: 1,
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K. Rowling",
          imageUrl: harryPotterImg
        },
        {
          id: 2,
          title: "Don Quixote",
          author: "Miguel de Cervantes",
          imageUrl: quixoteImg
        },
        {
          id: 3,
          title: "A Tale of Two Cities",
          author: "Charles Dickens",
          imageUrl: citiesImg
        },
        {
          id: 4,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          imageUrl: hobbitImg
        }
      ];

  return (
    <Layout>
      <section className={styles.hero}>
        <h2>YOUR FAVORITE ONLINE BOOKSTORE, ALWAYS JUST A CLICK AWAY</h2>
        <p>
          At BookNest, we believe that every book is a door to a new world. Whether you're looking for an
          exciting novel, a timeless classic or the latest bestseller, here you'll find thousands of titles for all
          tastes and ages.
        </p>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search Book or ISBN"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className={styles.trendingSection}>
        <h3>Our Trend Books</h3>
        <BookCarousel books={trendingBooks} />
      </section>

       <section className={styles.statsSection}>
       <div className={styles.statsContainer}>
       <div className={styles.statsImageWrapper}>
            <img 
            src={statsImage} 
            alt="Persona leyendo un libro" 
            className={styles.statsImage}
        />
        </div>
        <div className={styles.statsContent}>
        <h2>
            <span className={styles.highlight}>Your favourite Reads</span> Are Here!
        </h2>
          <p className={styles.statsDescription}>
            Immerse yourself in a world of stories, knowledge, and adventure. Whether you're searching for a gripping novel, 
            a thought-provoking non-fiction, or a timeless classic, we've got something special just for you.
          </p>
          
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Book Listing</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Registered Members</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>400+</span>
              <span className={styles.statLabel}>Branch Count</span>
            </div>
          </div>

          <button 
            className={styles.exploreButton}
            onClick={() => navigate('/shop')}
          >
            Explore More
          </button>
        </div>
        </div>
      </section>

    
    </Layout>
  );
};

export default Home;