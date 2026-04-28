import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { getImageUrl } from '../utils/helpers';
import ProductCard from '../components/ProductCard';
import './SearchPage.css';

const SearchPage = () => {
    const { productsData, loading } = useProducts();
    const [query, setQuery] = useState('');

    const results = React.useMemo(() => {
        if (query.trim() === '' || !productsData) {
            return [];
        }

        const searchTerm = query.toLowerCase();
        return productsData.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
    }, [query, productsData]);

    // Categories for suggestions when empty
    const categories = [
        { name: "Crochet Gifts", slug: "crochet-gifts", image: "./images/Crochet Kids Toys (Mini Dogs).jpeg" },
        { name: "Hair Accessories", slug: "hair-accessories", image: "./images/Floral Hair Clips.jpeg" },
        { name: "Baby Items", slug: "baby-items", image: "./images/babycrochetbooties.png" },
        { name: "Home Décor", slug: "home-decor", image: "./images/Floral Handmade Wall Decor.jpeg" }
    ];

    return (
        <div className="search-page section-padding">
            <div className="container">
                <div className="search-header">
                    <h1 className="section-title">Search</h1>
                    <div className="search-input-container">
                        <Search className="search-icon" size={24} />
                        <input
                            type="text"
                            placeholder="Search for products, categories..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="search-content">
                    {loading ? (
                        <div className="section-padding text-center"><h2>Loading products...</h2></div>
                    ) : query.trim() !== '' ? (
                        <div className="search-results">
                            <h2 className="results-count">
                                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                            </h2>
                            {results.length > 0 ? (
                                <div className="product-grid">
                                    {results.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <p>We couldn't find any products matching your search.</p>
                                    <p>Try checking your spelling or using more general terms.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="search-suggestions">
                            <h2>Popular Categories</h2>
                            <div className="category-grid" style={{ marginTop: '2rem' }}>
                                {categories.map((cat, index) => (
                                    <Link to={`/category/${cat.slug}`} key={index} className="suggestion-card">
                                        <img src={getImageUrl(cat.image)} alt={cat.name} />
                                        <span>{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
