import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import CustomOrders from './pages/CustomOrders';
import Tailoring from './pages/Tailoring';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import SearchPage from './pages/SearchPage';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductForm from './pages/admin/ProductForm';

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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/tailoring" element={<Tailoring />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies/:type" element={<Policy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/product/:id" element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <WhatsAppBtn />
      </div>
    </Router>
  );
}

export default App;
