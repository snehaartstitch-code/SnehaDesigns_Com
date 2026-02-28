import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="top-banner">
                <span>PAN India Shipping • WhatsApp Orders • Ready Stock + Made-to-Order</span>
            </div>
            <div className="header-main">
                <div className="container header-container">
                    <div className="header-left">
                        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link to="/" className="logo">
                            <img src="/images/Logo - Square - Transparent BG.png" alt="Sneha Art & Stitch" className="logo-img" />
                        </Link>
                    </div>

                    <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <div className="nav-dropdown">
                            <span>Categories</span>
                            <div className="dropdown-menu">
                                <Link to="/category/crochet-gifts" onClick={() => setIsMenuOpen(false)}>Crochet Gifts</Link>
                                <Link to="/category/hair-accessories" onClick={() => setIsMenuOpen(false)}>Hair Accessories</Link>
                                <Link to="/category/baby-items" onClick={() => setIsMenuOpen(false)}>Baby Items</Link>
                                <Link to="/category/home-decor" onClick={() => setIsMenuOpen(false)}>Home Décor</Link>
                                <Link to="/category/keychains" onClick={() => setIsMenuOpen(false)}>Keychains</Link>
                                <Link to="/category/bags" onClick={() => setIsMenuOpen(false)}>Bags</Link>
                            </div>
                        </div>
                        <Link to="/custom-orders" onClick={() => setIsMenuOpen(false)}>Custom Orders</Link>
                        <Link to="/tailoring" onClick={() => setIsMenuOpen(false)}>Tailoring</Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <Link to="/order-on-whatsapp" className="mobile-only" onClick={() => setIsMenuOpen(false)}>Order on WhatsApp</Link>
                    </nav>

                    <div className="header-right">
                        <div className="search-bar">
                            <input type="text" placeholder="Search products..." />
                            <button aria-label="Search"><Search size={20} /></button>
                        </div>
                        <a href="https://wa.me/917419150418" target="_blank" rel="noopener noreferrer" className="nav-whatsapp-btn desktop-only">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
