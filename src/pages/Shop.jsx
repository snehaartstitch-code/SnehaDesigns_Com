import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const initCategory = searchParams.get('category') || 'all';
    const initOccasion = searchParams.get('occasion') || 'all';

    const [products, setProducts] = useState(productsData);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        category: initCategory,
        priceRange: 'all',
        type: 'all',
        occasion: initOccasion
    });

    const [sortBy, setSortBy] = useState('popular');

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'crochet-gifts', label: 'Crochet Gifts' },
        { value: 'hair-accessories', label: 'Hair Accessories' },
        { value: 'baby-items', label: 'Baby Items' },
        { value: 'home-decor', label: 'Home Décor' },
        { value: 'keychains', label: 'Keychains' },
        { value: 'bags', label: 'Bags' }
    ];

    const types = [
        { value: 'all', label: 'All Types' },
        { value: 'ready', label: 'Ready Stock' },
        { value: 'made-to-order', label: 'Made-to-Order' }
    ];

    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: 'under-500', label: 'Under ₹500' },
        { value: '500-1000', label: '₹500 - ₹1000' },
        { value: 'over-1000', label: 'Over ₹1000' }
    ];

    useEffect(() => {
        let filtered = [...productsData];

        // Filter Category
        if (filters.category !== 'all') {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        // Filter Type
        if (filters.type !== 'all') {
            filtered = filtered.filter(p => p.tags && p.tags.includes(filters.type));
        }

        // Filter Price
        if (filters.priceRange === 'under-500') {
            filtered = filtered.filter(p => p.price < 500);
        } else if (filters.priceRange === '500-1000') {
            filtered = filtered.filter(p => p.price >= 500 && p.price <= 1000);
        } else if (filters.priceRange === 'over-1000') {
            filtered = filtered.filter(p => p.price > 1000);
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => {
                const aNew = a.tags && a.tags.includes('new') ? 1 : 0;
                const bNew = b.tags && b.tags.includes('new') ? 1 : 0;
                return bNew - aNew;
            });
        } else if (sortBy === 'popular') {
            filtered.sort((a, b) => {
                const aPop = a.tags && a.tags.includes('best-seller') ? 1 : 0;
                const bPop = b.tags && b.tags.includes('best-seller') ? 1 : 0;
                return bPop - aPop;
            });
        }

        setProducts(filtered);
    }, [filters, sortBy]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };

    const FilterSidebar = () => (
        <div className="filter-content">
            <div className="filter-group">
                <h4>Category</h4>
                {categories.map(cat => (
                    <label key={cat.value} className="filter-label">
                        <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={filters.category === cat.value}
                            onChange={handleFilterChange}
                        />
                        <span>{cat.label}</span>
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Availability</h4>
                {types.map(type => (
                    <label key={type.value} className="filter-label">
                        <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={filters.type === type.value}
                            onChange={handleFilterChange}
                        />
                        <span>{type.label}</span>
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Price Range</h4>
                {priceRanges.map(pr => (
                    <label key={pr.value} className="filter-label">
                        <input
                            type="radio"
                            name="priceRange"
                            value={pr.value}
                            checked={filters.priceRange === pr.value}
                            onChange={handleFilterChange}
                        />
                        <span>{pr.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="shop-page container">
            <div className="shop-header">
                <h1 className="shop-title">Shop All Collection</h1>
                <div className="shop-controls">
                    <button className="mobile-filter-btn" onClick={toggleMobileFilter}>
                        <SlidersHorizontal size={20} />
                        Filters
                    </button>

                    <div className="sort-control">
                        <label htmlFor="sort">Sort by:</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="popular">Popular</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="shop-layout">
                <aside className="shop-sidebar desktop-only">
                    <h3>Filters</h3>
                    <FilterSidebar />
                </aside>

                <div className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={toggleMobileFilter}>
                    <div className="mobile-filter-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-filter-header">
                            <h3>Filters</h3>
                            <button onClick={toggleMobileFilter} className="close-btn"><X size={24} /></button>
                        </div>
                        <div className="mobile-filter-body">
                            <FilterSidebar />
                        </div>
                        <div className="mobile-filter-footer">
                            <button className="btn-primary" style={{ width: '100%' }} onClick={toggleMobileFilter}>
                                Show {products.length} Results
                            </button>
                        </div>
                    </div>
                </div>

                <main className="shop-main">
                    <p className="results-count">Showing {products.length} products</p>
                    {products.length > 0 ? (
                        <div className="products-grid">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h3>No products found</h3>
                            <p>Try adjusting your filters.</p>
                            <button className="btn-secondary" onClick={() => setFilters({ category: 'all', type: 'all', priceRange: 'all', occasion: 'all' })}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
