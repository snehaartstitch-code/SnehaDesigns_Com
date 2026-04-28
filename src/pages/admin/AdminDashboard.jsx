import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, LogOut } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useProducts } from '../../hooks/useProducts';
import { getImageUrl } from '../../utils/helpers';
import './Admin.css';

const AdminDashboard = () => {
    const { productsData, loading, error, refreshProducts } = useProducts();
    const [deleting, setDeleting] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleDeleteClick = (e, product) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setProductToDelete(product);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        
        const id = productToDelete.id;
        setDeleting(id);
        
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
            
        if (error) {
            console.error("Supabase delete error:", error);
            alert("Error deleting product: " + error.message);
        } else {
            setProductToDelete(null);
            refreshProducts();
        }
        setDeleting(null);
    };

    if (loading) return <div className="section-padding text-center">Loading Admin...</div>;
    if (error) return <div className="section-padding text-center">Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            {productToDelete && (
                <div className="admin-modal-overlay" onClick={() => setProductToDelete(null)}>
                    <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Delete Product</h3>
                        <p>Are you sure you want to delete <strong>{productToDelete.name}</strong>? This action cannot be undone.</p>
                        <div className="admin-modal-actions">
                            <button 
                                className="btn-secondary" 
                                onClick={() => setProductToDelete(null)}
                                disabled={deleting === productToDelete.id}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn-primary" 
                                style={{ background: '#ef4444' }}
                                onClick={confirmDelete}
                                disabled={deleting === productToDelete.id}
                            >
                                {deleting === productToDelete.id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="admin-header">
                <div>
                    <h1 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Store Admin Dashboard</h1>
                    <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Manage your products and inventory.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/admin/categories" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Edit size={20} /> Manage Categories
                    </Link>
                    <Link to="/admin/product/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} /> Add New Product
                    </Link>
                    <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Desktop/Tablet table view */}
            <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
                <table className="admin-products-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map(product => {
                            const isReady = product.tags?.includes('ready');
                            return (
                                <tr key={product.id}>
                                    <td>
                                        {product.images?.[0] ? (
                                            <img src={getImageUrl(product.images[0])} alt={product.name} />
                                        ) : (
                                            <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 4 }}></div>
                                        )}
                                    </td>
                                    <td><strong>{product.name}</strong></td>
                                    <td>₹{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <span style={{ 
                                            padding: '0.25rem 0.5rem', 
                                            borderRadius: '1rem', 
                                            fontSize: '0.8rem',
                                            background: isReady ? '#dcfce7' : '#fef3c7',
                                            color: isReady ? '#166534' : '#92400e'
                                        }}>
                                            {isReady ? 'Ready Stock' : 'Made-to-Order'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="admin-actions">
                                            <Link to={`/admin/product/${product.id}`} className="admin-btn-icon" title="Edit">
                                                <Edit size={18} />
                                            </Link>
                                             <button 
                                                type="button"
                                                onClick={(e) => handleDeleteClick(e, product)} 
                                                className="admin-btn-icon delete" 
                                                title="Delete"
                                                disabled={deleting === product.id}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {productsData.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#fff' }}>
                        No products found. Add your first product!
                    </div>
                )}
            </div>

            {/* Mobile card view */}
            <div className="admin-mobile-cards">
                {productsData.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: '0.75rem' }}>
                        No products found. Add your first product!
                    </div>
                )}
                {productsData.map(product => {
                    const isReady = product.tags?.includes('ready');
                    return (
                        <div key={product.id} className="admin-product-card">
                            <div className="admin-product-card__top">
                                {product.images?.[0] ? (
                                    <img className="admin-product-card__img" src={getImageUrl(product.images[0])} alt={product.name} />
                                ) : (
                                    <div className="admin-product-card__img-placeholder" />
                                )}
                                <div className="admin-product-card__info">
                                    <div className="admin-product-card__name">{product.name}</div>
                                    <div className="admin-product-card__meta">₹{product.price} · {product.category}</div>
                                </div>
                            </div>
                            <div className="admin-product-card__bottom">
                                <span style={{
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.78rem',
                                    background: isReady ? '#dcfce7' : '#fef3c7',
                                    color: isReady ? '#166534' : '#92400e'
                                }}>
                                    {isReady ? 'Ready Stock' : 'Made-to-Order'}
                                </span>
                                <div className="admin-actions">
                                    <Link to={`/admin/product/${product.id}`} className="admin-btn-icon" title="Edit">
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={(e) => handleDeleteClick(e, product)}
                                        className="admin-btn-icon delete"
                                        title="Delete"
                                        disabled={deleting === product.id}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDashboard;
