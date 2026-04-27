import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const initCategory = searchParams.get('category') || 'all';
    const initOccasion = searchParams.get('occasion') || 'all';

    const [products, setProducts] = useState(productsData);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    const [filters, setFilters] = useState({
        category: initCategory !== 'all' ? [initCategory] : [],
        priceRange: [],
        type: []
    });

    const [sortBy, setSortBy] = useState('popular');

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat && cat !== 'all') {
            setFilters(prev => ({ ...prev, category: [cat] }));
        } else if (cat === 'all') {
            setFilters(prev => ({ ...prev, category: [] }));
        }
    }, [searchParams]);

    const categories = [
        { value: 'crochet-gifts', label: 'Crochet Gifts' },
        { value: 'hair-accessories', label: 'Hair Accessories' },
        { value: 'baby-items', label: 'Baby Items' },
        { value: 'home-decor', label: 'Home Décor' },
        { value: 'keychains', label: 'Keychains' },
        { value: 'bags', label: 'Bags' }
    ];

    const types = [
        { value: 'ready', label: 'Ready Stock' },
        { value: 'made-to-order', label: 'Made-to-Order' }
    ];

    const priceRanges = [
        { value: 'under-500', label: 'Under ₹500' },
        { value: '500-1000', label: '₹500 - ₹1000' },
        { value: 'over-1000', label: 'Over ₹1000' }
    ];

    useEffect(() => {
        let filtered = [...productsData];

        // Filter Category
        if (filters.category.length > 0) {
            filtered = filtered.filter(p => filters.category.includes(p.category));
        }

        // Filter Type
        if (filters.type.length > 0) {
            filtered = filtered.filter(p => p.tags && filters.type.some(t => p.tags.includes(t)));
        }

        // Filter Price
        if (filters.priceRange.length > 0) {
            filtered = filtered.filter(p => {
                return filters.priceRange.some(range => {
                    if (range === 'under-500') return p.price < 500;
                    if (range === '500-1000') return p.price >= 500 && p.price <= 1000;
                    if (range === 'over-1000') return p.price > 1000;
                    return false;
                });
            });
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
        const { name, value, checked } = e.target;
        setFilters(prev => {
            const currentArray = prev[name];
            if (checked) {
                return { ...prev, [name]: [...currentArray, value] };
            } else {
                return { ...prev, [name]: currentArray.filter(item => item !== value) };
            }
        });
    };

    const clearAllFilters = () => {
        setFilters({ category: [], priceRange: [], type: [] });
    };

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };

    const FilterSidebar = () => (
        <div className="filter-content">
            <div className="filter-header-action" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                    {Object.values(filters).flat().length} Selected
                </span>
                {Object.values(filters).flat().length > 0 && (
                    <button onClick={clearAllFilters} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}>
                        Clear All
                    </button>
                )}
            </div>
            <div className="filter-group">
                <h4>Category</h4>
                {categories.map(cat => (
                    <label key={cat.value} className="filter-label">
                        <input
                            type="checkbox"
                            name="category"
                            value={cat.value}
                            checked={filters.category.includes(cat.value)}
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
                            type="checkbox"
                            name="type"
                            value={type.value}
                            checked={filters.type.includes(type.value)}
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
                            type="checkbox"
                            name="priceRange"
                            value={pr.value}
                            checked={filters.priceRange.includes(pr.value)}
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

                    <div className="view-toggle desktop-only">
                        <button 
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            title="List View"
                        >
                            <List size={20} />
                        </button>
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
                        <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h3>No products found</h3>
                            <p>Try adjusting your filters.</p>
                            <button className="btn-secondary" onClick={clearAllFilters}>
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
