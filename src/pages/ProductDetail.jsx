import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ShieldCheck, CheckCircle2, ShoppingBag, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { getImageUrl } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { slug } = useParams();
    const { productsData, loading } = useProducts();
    const [selectedVariant, setSelectedVariant] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [pincodeMsg, setPincodeMsg] = useState('');
    const { addToCart } = useCart();
    const [cartAdded, setCartAdded] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    // Derive product first so callbacks below can reference it
    const product = React.useMemo(() => {
        if (!productsData || productsData.length === 0) return null;
        return productsData.find(p => {
            const cleanUrlSlug = slug.toLowerCase().replace(/[\s_]+/g, '-');
            const cleanDbSlug = p.slug?.trim().toLowerCase().replace(/[\s_]+/g, '-');
            return p.slug === slug || cleanDbSlug === cleanUrlSlug;
        });
    }, [slug, productsData]);

    useEffect(() => {
        if (product?.options?.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedVariant(product.options[0]);
        }
    }, [product]);

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);
        setActiveImageIndex(0);
    }, [slug]);

    const openLightbox = useCallback((idx) => {
        setActiveImageIndex(idx);
        setZoomLevel(1);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        setZoomLevel(1);
        document.body.style.overflow = '';
    }, []);

    const lightboxPrev = useCallback(() => {
        if (!product) return;
        setActiveImageIndex(i => (i - 1 + product.images.length) % product.images.length);
        setZoomLevel(1);
    }, [product]);

    const lightboxNext = useCallback(() => {
        if (!product) return;
        setActiveImageIndex(i => (i + 1) % product.images.length);
        setZoomLevel(1);
    }, [product]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev();
            if (e.key === 'ArrowRight') lightboxNext();
            if (e.key === '+' || e.key === '=') setZoomLevel(z => Math.min(z + 0.5, 4));
            if (e.key === '-') setZoomLevel(z => Math.max(z - 0.5, 1));
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxOpen, closeLightbox, lightboxPrev, lightboxNext]);

    if (loading) {
        return (
            <div className="section-padding container text-center">
                <h2>Loading product details...</h2>
            </div>
        );
    }

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

    const whatsappMessage = encodeURIComponent(`Hi Sneha Designs, I want to order: ${product.name}\nType: ${typeText}\nVariant: ${selectedVariant || 'N/A'}\nQuantity: ${quantity}\nPincode: ${pincode}\nAddress: `);

    return (
        <>
        <div className="product-page">
            <div className="container">
                <div className="product-layout">
                    {/* Gallery - Left */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <div
                                className="image-placeholder clickable-image"
                                onClick={() => product.images?.length > 0 && openLightbox(activeImageIndex)}
                                title="Click to view full image"
                            >
                                {product.images?.length > 0 ? (
                                    <img
                                        src={getImageUrl(product.images[activeImageIndex])}
                                        alt={`${product.name} - image ${activeImageIndex + 1}`}
                                        key={activeImageIndex}
                                        className="gallery-main-img"
                                    />
                                ) : (
                                    <span>Product Image</span>
                                )}
                                {product.images?.length > 0 && (
                                    <div className="expand-hint">
                                        <Maximize2 size={16} />
                                        <span>View Full Image</span>
                                    </div>
                                )}
                            </div>
                            {product.images?.length > 1 && (
                                <>
                                    <button
                                        className="carousel-btn carousel-btn-prev"
                                        onClick={() => setActiveImageIndex(i => (i - 1 + product.images.length) % product.images.length)}
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={22} />
                                    </button>
                                    <button
                                        className="carousel-btn carousel-btn-next"
                                        onClick={() => setActiveImageIndex(i => (i + 1) % product.images.length)}
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={22} />
                                    </button>
                                    <div className="carousel-dots">
                                        {product.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                className={`carousel-dot ${idx === activeImageIndex ? 'active' : ''}`}
                                                onClick={() => setActiveImageIndex(idx)}
                                                aria-label={`View image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {product.images?.length > 1 && (
                            <div className="thumbnail-strip">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`thumbnail-btn ${idx === activeImageIndex ? 'active' : ''}`}
                                        onClick={() => setActiveImageIndex(idx)}
                                        aria-label={`View image ${idx + 1}`}
                                    >
                                        <img src={getImageUrl(img)} alt={`${product.name} thumbnail ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
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
                                Order Now
                            </a>
                            <button
                                className="btn-secondary add-to-cart-btn"
                                onClick={() => {
                                    addToCart(product, selectedVariant, quantity);
                                    setCartAdded(true);
                                    setTimeout(() => setCartAdded(false), 2000);
                                }}
                            >
                                <ShoppingBag size={18} />
                                {cartAdded ? '✓ Added!' : 'Add to Cart'}
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
                        <p>Every piece at Sneha Designs is carefully crafted with premium materials. We believe in taking time to create beautiful goods that last...</p>
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

        {/* Lightbox Overlay */}
        {lightboxOpen && product?.images?.length > 0 && (
            <div
                className="lightbox-overlay"
                onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
                role="dialog"
                aria-modal="true"
                aria-label="Image viewer"
            >
                {/* Top bar */}
                <div className="lightbox-topbar">
                    <span className="lightbox-counter">
                        {activeImageIndex + 1} / {product.images.length}
                    </span>
                    <div className="lightbox-zoom-controls">
                        <button
                            className="lb-ctrl-btn"
                            onClick={() => setZoomLevel(z => Math.max(z - 0.5, 1))}
                            disabled={zoomLevel <= 1}
                            aria-label="Zoom out"
                        >
                            <ZoomOut size={20} />
                        </button>
                        <span className="zoom-label">{Math.round(zoomLevel * 100)}%</span>
                        <button
                            className="lb-ctrl-btn"
                            onClick={() => setZoomLevel(z => Math.min(z + 0.5, 4))}
                            disabled={zoomLevel >= 4}
                            aria-label="Zoom in"
                        >
                            <ZoomIn size={20} />
                        </button>
                        <button
                            className="lb-ctrl-btn"
                            onClick={() => setZoomLevel(1)}
                            aria-label="Reset zoom"
                            title="Reset zoom"
                        >
                            Reset
                        </button>
                    </div>
                    <button className="lb-close-btn" onClick={closeLightbox} aria-label="Close">
                        <X size={24} />
                    </button>
                </div>

                {/* Main image area */}
                <div className="lightbox-img-area">
                    {product.images.length > 1 && (
                        <button
                            className="lb-arrow lb-arrow-prev"
                            onClick={lightboxPrev}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={30} />
                        </button>
                    )}
                    <div className="lightbox-img-wrapper" style={{ overflow: zoomLevel > 1 ? 'auto' : 'hidden' }}>
                        <img
                            src={getImageUrl(product.images[activeImageIndex])}
                            alt={`${product.name} - image ${activeImageIndex + 1}`}
                            className="lightbox-img"
                            style={{
                                transform: `scale(${zoomLevel})`,
                                cursor: zoomLevel > 1 ? 'move' : 'zoom-in',
                            }}
                            onClick={() => setZoomLevel(z => z < 4 ? z + 0.5 : 1)}
                        />
                    </div>
                    {product.images.length > 1 && (
                        <button
                            className="lb-arrow lb-arrow-next"
                            onClick={lightboxNext}
                            aria-label="Next image"
                        >
                            <ChevronRight size={30} />
                        </button>
                    )}
                </div>

                {/* Thumbnail strip */}
                {product.images.length > 1 && (
                    <div className="lightbox-thumbs">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                className={`lb-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                                onClick={() => { setActiveImageIndex(idx); setZoomLevel(1); }}
                                aria-label={`View image ${idx + 1}`}
                            >
                                <img src={getImageUrl(img)} alt={`${product.name} thumbnail ${idx + 1}`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        )}
        </>
    );
};

export default ProductDetail;
