import React from 'react';
import Layout from '../../components/common/Layout';
import styles from '../../assets/styles/About.module.scss'; // Usando alias para la ruta de estilos
import aboutImg from '../../assets/images/about.jpg'; // Usando alias para la ruta de la imagen
import libroImg from '../../assets/images/libro.png'; // Usando alias para la ruta de la imagen
import libraryImg from '../../assets/images/library.png'; // Usando alias para la ruta de la imagen
import roomImg from '../../assets/images/room.png'; // Usando alias para la ruta de la imagen   

const About: React.FC = () => {
  return (
    <Layout>
      <div className={styles.aboutContainer}>

        {/* Encabezado superior con imagen */}
        <div className={styles.headerImage}>
          <img 
            src= {aboutImg}
            alt="About Banner" 
          />
        </div>

        {/* Sección About Us */}
        <section className={styles.section}>
          <h2 className={styles.title}>About Us</h2>
          <p className={styles.text}>
            Welcome to BookNest, your trusted source for a diverse range of books catering to every reader’s taste. Established with the mission to foster a love for reading in our community, we pride ourselves on providing excellent service and a carefully curated selection of books. Whether you’re looking for timeless classics, the latest bestsellers, or hidden literary gems, BookNest is here to ignite your passion for reading and connect you with stories that inspire.
          </p>
        </section>

        {/* Imágenes decorativas */}
        <div className={styles.imageRow}>
          <img src={roomImg} alt="Book room" />
          <img src={libroImg} alt="Open book" className={styles.centerImage} />
          <img src={libraryImg} alt="Bookshelf" />
        </div>

        {/* Sección Our Mission */}
        <section className={styles.section}>
          <h2 className={styles.title}>Our Mission</h2>
          <p className={styles.text}>
            At BookNest, our mission is to create a haven for book lovers, providing a carefully curated selection of literature that inspires, educates, and entertains. We believe in the power of stories to transport readers to new worlds, spark creativity, and foster a lifelong love for reading. Through our commitment to quality, accessibility, and community engagement, we aim to be the go-to destination for anyone seeking their next great read.
          </p>
        </section>

      </div>
    </Layout>
  );
};

export default About;
