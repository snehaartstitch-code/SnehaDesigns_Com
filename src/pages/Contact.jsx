import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Truck } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1>Contact & How to Order</h1>
                    <p className="contact-hero-subtitle">
                        Got a question or ready to place an order? Ordering from Sneha Designs is personal, simple, and secure. We handle all our orders and inquiries directly through WhatsApp.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="contact-main section-padding">
                <div className="container">
                    <div className="contact-grid">
                        
                        {/* Contact Information */}
                        <div className="contact-info-wrapper">
                            <div className="contact-info-card">
                                <h2>Get in Touch</h2>
                                <p className="contact-info-desc">Reach out to us for custom orders, queries, or to place an order. We're here to help!</p>
                                
                                <div className="contact-details-list">
                                    <div className="contact-detail-item">
                                        <div className="detail-icon"><Phone size={24} /></div>
                                        <div className="detail-text">
                                            <h3>WhatsApp Support</h3>
                                            <p>+91 7419150418</p>
                                        </div>
                                    </div>
                                    
                                    <div className="contact-detail-item">
                                        <div className="detail-icon"><Mail size={24} /></div>
                                        <div className="detail-text">
                                            <h3>Email Us</h3>
                                            <p>snehaartstitch@gmail.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="contact-detail-item">
                                        <div className="detail-icon"><MapPin size={24} /></div>
                                        <div className="detail-text">
                                            <h3>Location</h3>
                                            <p>Chhachhrauli, Yamunanagar,<br/>Haryana – 135103</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="contact-trust-badges">
                                    <div className="contact-trust-badge">
                                        <Truck size={20} />
                                        <span>PAN India Shipping</span>
                                    </div>
                                    <div className="contact-trust-badge">
                                        <ShieldCheck size={20} />
                                        <span>Secure Payments</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How to Order Steps */}
                        <div className="how-to-order-wrapper">
                            <h2>The Ordering Process</h2>
                            <p className="order-process-desc">Four simple steps to get your handcrafted items delivered.</p>
                            
                            <div className="steps-container">
                                <div className="premium-step-card">
                                    <div className="step-indicator">1</div>
                                    <div className="step-content">
                                        <h3>Browse the Shop</h3>
                                        <p>Explore our catalogue of Ready Stock and Made-to-Order handcrafted pieces to find what you love.</p>
                                    </div>
                                </div>
                                
                                <div className="premium-step-card">
                                    <div className="step-indicator">2</div>
                                    <div className="step-content">
                                        <h3>Click "Order Here"</h3>
                                        <p>Use the floating "Order Here" button located at the bottom right of your screen.</p>
                                    </div>
                                </div>
                                
                                <div className="premium-step-card">
                                    <div className="step-indicator">3</div>
                                    <div className="step-content">
                                        <h3>Confirm Details</h3>
                                        <p>Send your preferred variant, quantity, delivery pincode, and full address. We'll confirm availability and shipping costs.</p>
                                    </div>
                                </div>
                                
                                <div className="premium-step-card">
                                    <div className="step-indicator">4</div>
                                    <div className="step-content">
                                        <h3>Payment & Dispatch</h3>
                                        <p>Pay securely via UPI or Bank Transfer. Ready Stock ships in 1-2 days, Made-to-Order in 5-7 days.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-cta">
                                <a href="https://wa.me/917419150418" target="_blank" rel="noopener noreferrer" className="whatsapp-btn btn-large">
                                    Chat with us on WhatsApp
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
