import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import CustomOrders from './pages/CustomOrders';
import OrderOnWhatsApp from './pages/OrderOnWhatsApp';
import Tailoring from './pages/Tailoring';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 'calc(var(--header-height) + 36px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/order-on-whatsapp" element={<OrderOnWhatsApp />} />
            <Route path="/tailoring" element={<Tailoring />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies/:type" element={<Policy />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppBtn />
      </div>
    </Router>
  );
}

export default App;
