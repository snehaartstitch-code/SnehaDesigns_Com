import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';
import { useFavorites } from '../context/FavoritesContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { slug, name, price, images, tags, category } = product;
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorited = isFavorite(slug);

    const displayCategory = category ? category.replace(/-/g, ' ').toUpperCase() : '';

    const renderBadge = (tag) => {
        switch (tag) {
            case 'ready':
                return <span className="badge badge-ready">Ready Stock</span>;
            case 'made-to-order':
                return <span className="badge badge-made">Made-to-Order</span>;
            case 'new':
                return <span className="badge badge-new">New</span>;
            case 'best-seller':
                return <span className="badge badge-best">Best Seller</span>;
            default:
                return null;
        }
    };

    const whatsappMessage = encodeURIComponent(`Hi Sneha Designs, I want to order: ${name}\nType: \nVariant: \nQuantity: 1\nPincode: \nAddress: `);

    return (
        <div className="product-card">
            <Link to={`/product/${slug}`} className="product-image-container">
                {/* Primary image */}
                <div className="product-image-placeholder">
                    {images && images.length > 0 ? (
                        <img src={getImageUrl(images[0])} alt={name} loading="lazy" />
                    ) : (
                        <span>Product Image</span>
                    )}
                </div>

                {/* Secondary hover image (if available) */}
                {images && images.length > 1 ? (
                    <div className="product-image-hover">
                        <img src={getImageUrl(images[1])} alt={`${name} – alternate view`} loading="lazy" />
                    </div>
                ) : (
                    /* Fallback: show view-details overlay when no second image */
                    <div className="product-view-overlay">
                        <span className="btn-view-option">
                            <Eye size={18} /> View Details
                        </span>
                    </div>
                )}

                <button
                    className={`wishlist-btn${favorited ? ' wishlist-btn--active' : ''}`}
                    aria-label={favorited ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                >
                    <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
                </button>
            </Link>

            <div className="product-info">
                {tags && tags.length > 0 && (
                    <div className="product-badges">
                        {tags.map(tag => (
                            <React.Fragment key={tag}>
                                {renderBadge(tag)}
                            </React.Fragment>
                        ))}
                    </div>
                )}
                {displayCategory && <p className="product-category">{displayCategory}</p>}
                <Link to={`/product/${slug}`}>
                    <h3 className="product-title">{name}</h3>
                </Link>
                <div className="product-price-container">
                    <span className="product-price">₹{price}</span>
                </div>

                <div className="product-actions">
                    <a
                        href={`https://wa.me/917419150418?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-order-whatsapp"
                    >
                        <ShoppingBag size={18} /> Order Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
