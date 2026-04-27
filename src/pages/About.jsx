import React from 'react';
import { Heart } from 'lucide-react';
import './StaticPages.css';

const About = () => {
    return (
        <div className="static-page">
            <h1>Our Story</h1>
            <div className="static-content text-center">
                <Heart size={48} color="var(--color-accent)" style={{ margin: '0 auto 1.5rem auto' }} />
                <h2 style={{ marginTop: 0 }}>Welcome to Sneha Designs</h2>
                <p>Based in Chhachhrauli, Yamunanagar, Sneha Designs was born out of a passion for handcrafted beauty. Every single piece in our store is made by Neha, dedicated to bringing warmth, comfort, and a touch of elegance to your daily life.</p>
                <p>Whether it's a soft crochet bunny for a newborn, an elegant macramé wall hanging for your living room, or a custom personalized keychain, we believe in the magic of handmade goods.</p>
                <p>We source our materials carefully, ensuring that the yarn and fabrics we use are gentle, durable, and of premium quality.</p>
                <div style={{ marginTop: '3rem' }}>
                    <h3>The Maker Behind the Brand</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
                        <img src="./images/founderimage.png" alt="Neha - Founder" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--color-base)', boxShadow: 'var(--shadow-md)' }} />
                    </div>
                    <p>Hi, I am Neha! I've been crocheting and crafting for years. What started as a hobby of making gifts for friends and family soon turned into a deep passion. I realized that handmade items carry a special kind of energy—they are made with time, patience, and lots of love.</p>
                    <p>Thank you for supporting my small business and choosing handmade.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
