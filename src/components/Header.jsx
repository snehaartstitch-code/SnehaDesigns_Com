import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useCategories } from '../hooks/useCategories';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { favorites } = useFavorites();
    const favCount = favorites.length;
    const { cartCount, setIsCartOpen } = useCart();
    const { categories } = useCategories();

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    // Close nav on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') closeMenu(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    // Prevent body scroll when nav is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <header className="header">
            <div className="top-banner desktop-only">
                <span>PAN India Shipping • WhatsApp Orders • Ready Stock + Made-to-Order</span>
            </div>
            <div className="header-main">
                <div className="container header-container">
                    <div className="header-left">
                        <Link to="/" className="logo">
                            <img src="/images/Logo - Square - Transparent BG.png" alt="Sneha Designs" className="logo-img" />
                        </Link>
                    </div>

                    <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <div className="nav-dropdown">
                            <Link to="/shop" onClick={closeMenu}>Shop</Link>
                            <div className="dropdown-menu">
                                <Link to="/shop" onClick={closeMenu}>All Products</Link>
                                {categories.map(cat => (
                                    <Link
                                        key={cat.slug}
                                        to={`/category/${cat.slug}`}
                                        onClick={closeMenu}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="nav-dropdown">
                            <span>Services</span>
                            <div className="dropdown-menu">
                                <Link to="/custom-orders" onClick={closeMenu}>Custom Orders</Link>
                                <Link to="/tailoring" onClick={closeMenu}>Tailoring</Link>
                            </div>
                        </div>
                        <Link to="/about" onClick={closeMenu}>About</Link>
                        <Link to="/contact" onClick={closeMenu}>Contact</Link>
                    </nav>

                    <div className="header-right">
                        <Link to="/search" className="header-search-link" onClick={closeMenu}>
                            <span className="desktop-search-text">Search</span>
                            <Search size={20} />
                        </Link>

                        <Link to="/favorites" className="header-icon-link header-heart-link">
                            <Heart size={20} />
                            {favCount > 0 && (
                                <span className="header-badge">{favCount}</span>
                            )}
                        </Link>
                        <button
                            className="header-icon-link header-cart-btn"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Open cart"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="header-badge">{cartCount}</span>
                            )}
                        </button>
                        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Backdrop overlay — click outside to close nav */}
            <div
                className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
                onClick={closeMenu}
                aria-hidden="true"
            />
        </header>
    );
};

export default Header;
