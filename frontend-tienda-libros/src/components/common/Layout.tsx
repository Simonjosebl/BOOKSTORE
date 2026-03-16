import React from 'react';
import Header from './Header';  // Importamos el componente Header que crearemos
import '../../assets/styles/global.scss';  // Usando alias
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app">
      <Header />  {/* Header con el diseño BOOKNEST de tu imagen */}
      <main>{children}</main>  {/* Contenido dinámico (Home, About, etc.) */}
      <Footer />  {/* Footer con el diseño BOOKNEST de tu imagen */}
    </div>
  );
};

export default Layout;