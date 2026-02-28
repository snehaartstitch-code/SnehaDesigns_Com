import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import productsData from '../data/products.json';
import './ProductDetail.css';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [pincodeMsg, setPincodeMsg] = useState('');

    useEffect(() => {
        const foundProduct = productsData.find(p => p.slug === slug);
        setProduct(foundProduct);
        if (foundProduct?.options?.length > 0) {
            setSelectedVariant(foundProduct.options[0]);
        }
        // Scroll to top
        window.scrollTo(0, 0);
    }, [slug]);

    if (!product) {
        return (
            <div className="section-padding container text-center">
                <h2>Product not found</h2>
                <Link to="/shop" className="btn-primary mt-2rem">Return to Shop</Link>
            </div>
        );
    }

    const isReadyStock = product.tags?.includes('ready');
    const typeText = isReadyStock ? 'Ready Stock' : 'Made-to-Order';

    const handlePincodeCheck = () => {
        if (pincode.length === 6 && /^\d+$/.test(pincode)) {
            setPincodeMsg(`Delivery available to ${pincode}. Ships in ${isReadyStock ? '1-2 business days' : '5-7 days'}.`);
        } else {
            setPincodeMsg('Please enter a valid 6-digit Pincode.');
        }
    };

    const whatsappMessage = encodeURIComponent(`Hi Sneha Art & Stitch, I want to order: ${product.name}\nType: ${typeText}\nVariant: ${selectedVariant || 'N/A'}\nQuantity: ${quantity}\nPincode: ${pincode}\nAddress: `);

    return (
        <div className="product-page">
            <div className="container">
                <div className="product-layout">
                    {/* Gallery - Left */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <div className="image-placeholder">
                                {product.images?.length > 0 ? (
                                    <img src={product.images[0]} alt={product.name} />
                                ) : (
                                    <span>Product Image</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details - Right */}
                    <div className="product-details">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">₹{product.price}</p>

                        <div className={`availability-badge ${isReadyStock ? 'ready' : 'made'}`}>
                            <CheckCircle2 size={16} />
                            <span>{isReadyStock ? 'Ready Stock: Ships in 1-2 business days' : 'Made-to-Order: Made in 5-7 days'}</span>
                        </div>

                        {/* Highlights */}
                        {product.highlights && product.highlights.length > 0 && (
                            <ul className="product-highlights">
                                {product.highlights.map((hlt, idx) => (
                                    <li key={idx}>{hlt}</li>
                                ))}
                            </ul>
                        )}

                        {/* Variants */}
                        {product.options && product.options.length > 0 && (
                            <div className="product-variants">
                                <p>Select Variant: <strong>{selectedVariant}</strong></p>
                                <div className="variant-options">
                                    {product.options.map((opt) => (
                                        <button
                                            key={opt}
                                            className={`variant-btn ${selectedVariant === opt ? 'selected' : ''}`}
                                            onClick={() => setSelectedVariant(opt)}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="product-quantity">
                            <p>Quantity:</p>
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        {/* Pincode Check */}
                        <div className="pincode-check">
                            <p>Check Delivery:</p>
                            <div className="pincode-input-group">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    maxLength={6}
                                />
                                <button className="btn-secondary" onClick={handlePincodeCheck}>Check</button>
                            </div>
                            {pincodeMsg && <p className="pincode-msg" style={{ color: pincodeMsg.includes('valid') ? 'var(--color-accent)' : '#1e8e3e' }}>{pincodeMsg}</p>}
                        </div>

                        {/* Actions */}
                        <div className="product-actions-main">
                            <a
                                href={`https://wa.me/917419150418?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary whatsapp-cta-btn"
                            >
                                Order on WhatsApp
                            </a>
                            <button className="btn-secondary add-to-cart-btn" onClick={() => alert("Added to cart (Placeholder)")}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Below the fold */}
                <div className="product-below-fold">
                    <div className="product-description-section">
                        <h2>Description</h2>
                        <p>{product.description}</p>
                        <h3 className="mt-2rem">The Handmade Story</h3>
                        <p>Every piece at Sneha Art & Stitch is carefully crafted with premium materials. We believe in taking time to create beautiful goods that last...</p>
                        <h3 className="mt-2rem">Care Instructions</h3>
                        <p>Gentle hand wash recommended. Do not wring or bleach. Dry flat in shade to maintain the shape and color of your beautiful handmade item.</p>
                    </div>

                    <div className="shipping-returns-section">
                        <div className="info-box">
                            <Truck size={24} color="var(--color-accent)" />
                            <h4>Shipping Details</h4>
                            <p>PAN India shipping available. Ready stock ships in 1-2 days. Made-to-order items take roughly 5-7 days before dispatch.</p>
                        </div>
                        <div className="info-box mt-1rem">
                            <ShieldCheck size={24} color="var(--color-accent)" />
                            <h4>Returns Policy</h4>
                            <p>We accept returns only for damaged items upon arrival. An unboxing video is required for damage claims.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
