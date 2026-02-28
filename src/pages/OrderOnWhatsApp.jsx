import React from 'react';
import { MapPin } from 'lucide-react';
import './StaticPages.css';

const OrderOnWhatsApp = () => {
    return (
        <div className="static-page">
            <h1>How to Order on WhatsApp</h1>
            <div className="static-content">
                <p className="text-center" style={{ marginBottom: '2rem' }}>Ordering from Sneha Art & Stitch is personal, simple, and secure.</p>

                <div className="step-card">
                    <div className="step-number">1</div>
                    <div>
                        <h3>Browse the Shop</h3>
                        <p>Find the products you love. Our catalogue includes both Ready Stock items and Made-to-Order handcrafted pieces.</p>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-number">2</div>
                    <div>
                        <h3>Click "Order on WhatsApp"</h3>
                        <p>On any product page, click the WhatsApp button. It will open a pre-filled message with the product details.</p>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-number">3</div>
                    <div>
                        <h3>Confirm Details</h3>
                        <p>Send us the message with your preferred variant, quantity, delivery pincode, and full address. We will reply to confirm availability and shipping costs.</p>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-number">4</div>
                    <div>
                        <h3>Payment & Dispatch</h3>
                        <p>Once payment is completed via UPI/Bank Transfer, we will begin packing your order. <strong>Ready Stock</strong> items ship in 1-2 days. <strong>Made-to-Order</strong> items take roughly 5-7 days to craft.</p>
                    </div>
                </div>

                <div className="mt-2rem text-center" style={{ marginTop: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <MapPin size={24} color="var(--color-accent)" /> Location & Shipping
                    </h3>
                    <p>We are based in <strong>Chhachhrauli, Yamunanagar, Haryana – 135103</strong></p>
                    <p>We provide <strong>PAN India shipping</strong> through our trusted logistics partners.</p>
                    <br />
                    <a href="https://wa.me/917419150418" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '1rem' }}>
                        Chat with us now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OrderOnWhatsApp;
