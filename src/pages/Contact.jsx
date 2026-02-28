import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import './StaticPages.css';

const Contact = () => {
    return (
        <div className="static-page">
            <h1>Contact Us</h1>
            <div className="static-content">
                <p className="text-center">Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Phone size={24} color="var(--color-accent)" />
                        <div>
                            <h3 style={{ margin: 0 }}>WhatsApp Support</h3>
                            <p style={{ margin: 0 }}>+91 7419150418</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <MapPin size={24} color="var(--color-accent)" />
                        <div>
                            <h3 style={{ margin: 0 }}>Location</h3>
                            <p style={{ margin: 0 }}>Chhachhrauli, Yamunanagar, Haryana – 135103</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Mail size={24} color="var(--color-accent)" />
                        <div>
                            <h3 style={{ margin: 0 }}>Email</h3>
                            <p style={{ margin: 0 }}>hello@snehaartandstitch.com (Coming soon)</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <a href="https://wa.me/917419150418" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
