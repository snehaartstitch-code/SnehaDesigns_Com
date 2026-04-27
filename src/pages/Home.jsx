import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Truck, ShieldCheck, HeartHandshake, PhoneCall, Star, StarHalf, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
    const { productsData, loading, error } = useProducts();
    const reviewsRef = useRef(null);

    const scrollReviews = (direction) => {
        if (reviewsRef.current) {
            const scrollAmount = reviewsRef.current.offsetWidth / 3 + 32;
            reviewsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />);
            } else if (i - 0.5 === rating) {
                stars.push(<StarHalf key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />);
            } else {
                stars.push(<Star key={i} size={16} fill="transparent" color="var(--color-accent)" />);
            }
        }
        return stars;
    };

    if (loading) return <div className="section-padding container text-center"><h2>Loading products...</h2></div>;
    if (error) return <div className="section-padding container text-center"><h2>Error: {error}</h2></div>;

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

    const reviews = [
        {
            id: 1,
            text: "bought the strawberry keychain and its literally the cutest thing ever 🥺 quality is amazing and it hasn't frayed at all!",
            author: "Meera T.",
            rating: 5
        },
        {
            id: 2,
            text: "I asked for custom colors for the baby booties for my nephew and they were so helpful. Arrived in like 4 days and the packaging was lovely.",
            author: "Kabir S.",
            rating: 4.5
        },
        {
            id: 3,
            text: "Obsessed with the floral hair clips! My daughter refuses to take them off. The colors are exactly like the pictures.",
            author: "Neha V.",
            rating: 5
        },
        {
            id: 4,
            text: "ordered a couple of crochet bags for gifting. everyone loved the handmade touch. definitely coming back for more.",
            author: "Riya P.",
            rating: 4
        },
        {
            id: 5,
            text: "The handmade wall decor is beautiful, looks so much better in person than in the photos. Completely brightens up my room!",
            author: "Anjali D.",
            rating: 4.5
        },
        {
            id: 6,
            text: "Got a cute lil crochet mini dog for my car dashboard. Quality is super solid and it's holding up well in the heat.",
            author: "Varun K.",
            rating: 5
        }
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
                    <div className="reviews-carousel-container" style={{ position: 'relative' }}>
                        <button className="carousel-arrow left" onClick={() => scrollReviews('left')} aria-label="Previous">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="reviews-grid" ref={reviewsRef}>
                            {reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="stars">
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="review-text">"{review.text}"</p>
                                    <p className="review-author">- {review.author}</p>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-arrow right" onClick={() => scrollReviews('right')} aria-label="Next">
                            <ChevronRight size={24} />
                        </button>
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
