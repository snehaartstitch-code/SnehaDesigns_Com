import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3 className="footer-brand">Sneha Designs</h3>
                    <p className="footer-desc">
                        Handmade with Love, Crafted with Care. Thoughtful crochet and handcrafted pieces for meaningful moments.
                    </p>
                    <div className="footer-contact">
                        <div className="contact-item">
                            <MapPin size={18} />
                            <span>Chhachhrauli, Yamunanagar, Haryana – 135103</span>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} />
                            <span>+91 7419150418</span>
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="https://www.instagram.com/snehaartandstitch?igsh=MW03eWlocTNjNWN4aQ==" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={20} /></a>
                        <a href="https://www.facebook.com/share/1DmPFuTWvh/" target="_blank" rel="noopener noreferrer" className="social-link"><Facebook size={20} /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/shop">Shop All</Link></li>
                        <li><Link to="/custom-orders">Custom Orders</Link></li>
                        <li><Link to="/tailoring">Tailoring</Link></li>
                        <li><Link to="/about">Our Story</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Customer Care</h4>
                    <ul className="footer-links">
                        <li><Link to="/contact">How to Order</Link></li>
                        <li><Link to="/policies/shipping">Shipping Policy</Link></li>
                        <li><Link to="/policies/returns">Returns & Refunds</Link></li>
                        <li><Link to="/policies/privacy">Privacy Policy</Link></li>
                        <li><Link to="/policies/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Sneha Designs. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
