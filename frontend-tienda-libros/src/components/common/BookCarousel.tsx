import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../assets/styles/Home.module.scss';

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
}

const BookCarousel: React.FC<{ books: Book[] }> = ({ books }) => {
  const settings = {
    dots: true, // Muestra los puntos de navegación
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Muestra 4 libros a la vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookSlide}>
            <img 
              src={book.imageUrl} 
              alt={book.title} 
              className={styles.bookImage}
            />
            <div className={styles.bookInfo}>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;