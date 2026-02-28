import React, { useState } from 'react';
import './StaticPages.css';

const CustomOrders = () => {
    const [formData, setFormData] = useState({
        name: '',
        occasion: 'birthday',
        details: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const whatsappMessage = encodeURIComponent(`Hi Sneha Art & Stitch, I have a custom order request:
Name: ${formData.name}
Occasion: ${formData.occasion}
Details: ${formData.details}`);

    return (
        <div className="static-page">
            <h1>Custom Orders</h1>
            <div className="static-content">
                <p>Looking for a specific color combination, a custom name keychain, or a full set for a special occasion? We love bringing your ideas to life!</p>

                <h2>Popular Custom Requests</h2>
                <ul>
                    <li><strong>Weddings:</strong> Customized crochet favors and bridesmaid gifts.</li>
                    <li><strong>Baby Showers:</strong> Matching baby blanket and bunny sets in your theme colors.</li>
                    <li><strong>Festive:</strong> Specialized home décor and torans.</li>
                </ul>

                <h2>Request a Quote</h2>
                <div className="contact-form">
                    <div className="form-group">
                        <label>Your Name</label>
                        <input name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label>Occasion</label>
                        <select name="occasion" className="form-input" value={formData.occasion} onChange={handleChange}>
                            <option value="birthday">Birthday</option>
                            <option value="wedding">Wedding / Bridal</option>
                            <option value="baby-shower">Baby Shower</option>
                            <option value="festive">Festive / Diwali</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>What would you like us to make?</label>
                        <textarea name="details" className="form-textarea" rows="4" value={formData.details} onChange={handleChange} placeholder="Describe colors, quantity, styles, etc."></textarea>
                    </div>
                    <a
                        href={`https://wa.me/917419150418?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ justifyContent: 'center' }}
                    >
                        Send Request via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CustomOrders;
