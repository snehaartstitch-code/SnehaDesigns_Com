import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { slug, name, price, images, tags, category } = product;

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
                <div className="product-image-placeholder">
                    {images && images.length > 0 ? (
                        <img src={images[0]} alt={name} loading="lazy" />
                    ) : (
                        <span>Product Image</span>
                    )}
                </div>
                <div className="product-view-overlay">
                    <span className="btn-view-option">
                        <Eye size={18} /> View Details
                    </span>
                </div>

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
                        <ShoppingBag size={18} /> Order via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
