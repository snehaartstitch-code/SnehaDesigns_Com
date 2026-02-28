import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Truck, ShieldCheck, HeartHandshake, PhoneCall, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
    const bestSellers = productsData.filter(p => p.tags && p.tags.includes('best-seller')).slice(0, 4);
    const newArrivals = productsData.filter(p => p.tags && p.tags.includes('new')).slice(0, 4);

    const categories = [
        { name: "Crochet Gifts", slug: "crochet-gifts", image: "./images/Crochet Kids Toys (Mini Dogs).jpeg" },
        { name: "Hair Accessories", slug: "hair-accessories", image: "./images/Floral Hair Clips.jpeg" },
        { name: "Baby Items", slug: "baby-items", image: "./images/babycrochetbooties.png" },
        { name: "Home Décor", slug: "home-decor", image: "./images/Floral Handmade Wall Decor.jpeg" },
        { name: "Keychains", slug: "keychains", image: "./images/Keychain Accessories (Strawberries).jpeg" },
        { name: "Bags", slug: "bags", image: "./images/Crochet Bag.jpeg" }
    ];

    const occasions = [
        "Birthday", "Baby Shower", "Wedding", "Festive", "Valentine"
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-container">
                    <h1 className="hero-title">Handmade with Love,<br />Crafted with Care</h1>
                    <p className="hero-subtext">Thoughtful crochet and handcrafted pieces for meaningful moments.</p>
                    <div className="hero-ctas">
                        <Link to="/shop" className="btn-primary">Shop Now</Link>
                        <Link to="/about" className="btn-secondary">Our Story</Link>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="trust-badges">
                <div className="container badges-grid">
                    <div className="badge-item"><HeartHandshake size={32} /><span>Handmade</span></div>
                    <div className="badge-item"><Truck size={32} /><span>PAN India Shipping</span></div>
                    <div className="badge-item"><PhoneCall size={32} /><span>WhatsApp Support</span></div>
                    <div className="badge-item"><ShieldCheck size={32} /><span>Ready/Made-to-Order</span></div>
                </div>
            </section>

            {/* Category Tiles */}
            <section className="section-padding bg-light">
                <div className="container">
                    <h2 className="section-title text-center">Shop by Category</h2>
                    <div className="category-grid">
                        {categories.map(cat => (
                            <Link to={`/category/${cat.slug}`} key={cat.slug} className="category-tile">
                                <div className="category-image">
                                    <img src={cat.image} alt={cat.name} />
                                </div>
                                <h3>{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            {bestSellers.length > 0 && (
                <section className="section-padding">
                    <div className="container">
                        <h2 className="section-title text-center">Best Sellers</h2>
                        <div className="products-grid">
                            {bestSellers.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <section className="section-padding bg-light">
                    <div className="container">
                        <h2 className="section-title text-center">New Arrivals</h2>
                        <div className="products-grid">
                            {newArrivals.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="text-center mt-2rem">
                            <Link to="/shop" className="btn-secondary">View All Products</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Shop by Occasion */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title text-center">Shop by Occasion</h2>
                    <div className="occasion-grid">
                        {occasions.map(occ => (
                            <Link to={`/shop?occasion=${encodeURIComponent(occ)}`} key={occ} className="btn-secondary">
                                {occ}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews / Testimonials */}
            <section className="section-padding reviews-section bg-light">
                <div className="container">
                    <h2 className="section-title text-center">Customer Love</h2>
                    <div className="reviews-grid">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="review-card">
                                <div className="stars">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="var(--color-accent)" color="var(--color-accent)" />)}
                                </div>
                                <p className="review-text">"Absolutely love the quality of the crochet items! It's so soft and well-made."</p>
                                <p className="review-author">- Happy Customer</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Orders CTA */}
            <section className="section-padding custom-cta-section text-center">
                <div className="container">
                    <h2 className="section-title">Looking for something unique?</h2>
                    <p className="cta-subtext">We take custom requests for special colors and personalized designs.</p>
                    <Link to="/custom-orders" className="btn-primary">Request Custom Order</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
