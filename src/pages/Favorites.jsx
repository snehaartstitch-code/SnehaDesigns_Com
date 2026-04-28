import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import './Favorites.css';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page">
            <div className="container">
                <div className="favorites-header">
                    <h1 className="favorites-title">
                        <Heart size={28} className="favorites-title-icon" />
                        My Wishlist
                    </h1>
                    <p className="favorites-subtitle">
                        {favorites.length === 0
                            ? 'Your wishlist is empty'
                            : `${favorites.length} ${favorites.length === 1 ? 'item' : 'items'} saved`}
                    </p>
                </div>

                {favorites.length === 0 ? (
                    <div className="favorites-empty">
                        <div className="favorites-empty-icon">
                            <Heart size={64} />
                        </div>
                        <h2>Nothing here yet</h2>
                        <p>Tap the ♡ on any product to save it here for later.</p>
                        <Link to="/shop" className="btn-shop-now">
                            Browse the Shop
                        </Link>
                    </div>
                ) : (
                    <div className="products-grid">
                        {favorites.map((product) => (
                            <ProductCard key={product.slug} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
