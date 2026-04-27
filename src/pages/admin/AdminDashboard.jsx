import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, LogOut } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useProducts } from '../../hooks/useProducts';
import './Admin.css';

const AdminDashboard = () => {
    const { productsData, loading, error } = useProducts();
    const [deleting, setDeleting] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        setDeleting(id);
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
            
        if (error) {
            alert("Error deleting product: " + error.message);
        } else {
            // Ideally we'd refresh the useProducts hook here, 
            // but for a quick refresh we can just reload the page
            window.location.reload();
        }
        setDeleting(null);
    };

    if (loading) return <div className="section-padding text-center">Loading Admin...</div>;
    if (error) return <div className="section-padding text-center">Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div>
                    <h1 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Store Admin Dashboard</h1>
                    <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Manage your products and inventory.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/admin/product/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} /> Add New Product
                    </Link>
                    <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
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
                                            <img src={product.images[0]} alt={product.name} />
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
                                                <Edit size={18} color="var(--color-text)" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(product.id)} 
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
        </div>
    );
};

export default AdminDashboard;
