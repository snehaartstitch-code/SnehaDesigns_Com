import React from 'react';
import { Scissors } from 'lucide-react';
import './StaticPages.css';

const Tailoring = () => {
    return (
        <div className="static-page">
            <h1>Tailoring Services</h1>
            <div className="static-content text-center py-4" style={{ padding: '4rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--color-base)', padding: '1.5rem', borderRadius: '50%' }}>
                        <Scissors size={48} color="var(--color-accent)" />
                    </div>
                </div>
                <h2 style={{ fontSize: '2rem', marginTop: 0 }}>Coming Soon!</h2>
                <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                    We are currently setting up our premium tailoring boutique. Soon, we will be offering bespoke stitching services.
                </p>
                <ul style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto 2.5rem auto' }}>
                    <li>✓ Premium Suit Stitching</li>
                    <li>✓ Palazzo & Trouser Stitching</li>
                    <li>✓ Custom Indian Attire Tailoring</li>
                </ul>
                <div style={{ background: 'var(--color-base)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ marginTop: 0 }}>Have an urgent requirement?</h3>
                    <p style={{ marginBottom: '1.5rem' }}>Reach out to us to check our current capacity for specialized orders.</p>
                    <a href="https://wa.me/917419150418" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Get a Quote on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Tailoring;
