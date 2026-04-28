import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, PlusCircle, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { getImageUrl } from '../../utils/helpers';
import './Admin.css';

const defaultCategories = [
    { name: "Crochet Gifts",    slug: "crochet-gifts",    image: "./images/Crochet Kids Toys (Mini Dogs).jpeg" },
    { name: "Hair Accessories", slug: "hair-accessories", image: "./images/Floral Hair Clips.jpeg" },
    { name: "Baby Items",       slug: "baby-items",       image: "./images/babycrochetbooties.png" },
    { name: "Home Décor",       slug: "home-decor",       image: "./images/Floral Handmade Wall Decor.jpeg" },
    { name: "Keychains",        slug: "keychains",        image: "./images/Keychain Accessories (Strawberries).jpeg" },
    { name: "Bags",             slug: "bags",             image: "./images/Crochet Bag.jpeg" }
];

const AdminCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingObj, setUploadingObj] = useState(null);

    // Add-new state
    const [newName, setNewName] = useState('');
    const [addError, setAddError] = useState('');

    // Delete confirmation modal state
    const [deleteModal, setDeleteModal] = useState(null); // { index, cat }
    const [affectedCount, setAffectedCount] = useState(null);
    const [checkingAffected, setCheckingAffected] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('products')
            .select('description')
            .eq('id', 'system-categories')
            .single();

        if (data?.description) {
            try {
                const parsed = JSON.parse(data.description);
                setCategories(Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultCategories);
            } catch {
                setCategories(defaultCategories);
            }
        } else {
            setCategories(defaultCategories);
        }
        setLoading(false);
    };

    // ---------- Image upload ----------
    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingObj(index);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `category-${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(fileName);

            const updated = [...categories];
            updated[index] = { ...updated[index], image: publicUrl };
            setCategories(updated);
        } catch (err) {
            alert('Error uploading image: ' + err.message);
        } finally {
            setUploadingObj(null);
            e.target.value = '';
        }
    };

    // ---------- Add category ----------
    const nameToSlug = (name) =>
        name.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-');

    const handleAddCategory = () => {
        setAddError('');
        const trimmed = newName.trim();
        if (!trimmed) { setAddError('Please enter a category name.'); return; }

        const slug = nameToSlug(trimmed);
        if (categories.some(c => c.slug === slug)) {
            setAddError('A category with this name already exists.');
            return;
        }

        setCategories(prev => [
            ...prev,
            { name: trimmed, slug, image: '' }
        ]);
        setNewName('');
    };

    // ---------- Delete category (with warning) ----------
    const handleDeleteRequest = async (index, cat) => {
        setDeleteModal({ index, cat });
        setAffectedCount(null);
        setCheckingAffected(true);

        // Count products using this category slug
        const { count } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true })
            .eq('category', cat.slug)
            .neq('category', 'system');

        setAffectedCount(count ?? 0);
        setCheckingAffected(false);
    };

    const confirmDelete = () => {
        if (!deleteModal) return;
        setCategories(prev => prev.filter((_, i) => i !== deleteModal.index));
        setDeleteModal(null);
        setAffectedCount(null);
    };

    // ---------- Save to Supabase ----------
    const handleSave = async () => {
        setSaving(true);
        const payload = {
            id: 'system-categories',
            slug: 'system-categories',
            name: 'System Settings - Categories',
            price: 0,
            category: 'system',
            description: JSON.stringify(categories),
            tags: [],
            highlights: [],
            options: [],
            images: []
        };

        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('id', 'system-categories')
            .single();

        const result = existing
            ? await supabase.from('products').update(payload).eq('id', 'system-categories')
            : await supabase.from('products').insert([payload]);

        setSaving(false);
        if (result.error) {
            alert('Error saving categories: ' + result.error.message);
        } else {
            alert('Categories updated successfully!');
            navigate('/admin');
        }
    };

    if (loading) return <div className="section-padding text-center">Loading categories...</div>;

    return (
        <div className="admin-dashboard">
            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '1rem', padding: '2rem',
                        maxWidth: '420px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <AlertTriangle size={24} color="#f59e0b" />
                            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Delete Category?</h2>
                        </div>
                        <p style={{ color: '#6b7280', marginBottom: '0.75rem' }}>
                            You are about to delete <strong>"{deleteModal.cat.name}"</strong>.
                        </p>
                        {checkingAffected ? (
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Checking affected products…</p>
                        ) : (
                            affectedCount > 0 ? (
                                <div style={{
                                    background: '#fef3c7', border: '1px solid #fcd34d',
                                    borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem'
                                }}>
                                    <strong style={{ color: '#92400e' }}>
                                        ⚠️ {affectedCount} existing product{affectedCount !== 1 ? 's' : ''} use this category.
                                    </strong>
                                    <p style={{ margin: '0.25rem 0 0', color: '#78350f', fontSize: '0.85rem' }}>
                                        Those products will still exist but their category will no longer appear in filters or navigation.
                                    </p>
                                </div>
                            ) : (
                                <p style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    ✓ No products are using this category.
                                </p>
                            )
                        )}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button
                                className="btn-secondary"
                                onClick={() => { setDeleteModal(null); setAffectedCount(null); }}
                                disabled={checkingAffected}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-primary"
                                style={{ background: '#ef4444' }}
                                onClick={confirmDelete}
                                disabled={checkingAffected}
                            >
                                Delete Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={() => navigate('/admin')} className="btn-secondary" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <div className="admin-form-container" style={{ maxWidth: '1000px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 style={{ margin: 0 }}>Manage Categories</h1>
                    <button onClick={handleSave} className="btn-primary" disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} /> {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                </div>

                {/* Add new category */}
                <div style={{
                    background: '#f9fafb', border: '1px solid #e5e7eb',
                    borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '2rem'
                }}>
                    <h3 style={{ margin: '0 0 1rem' }}>Add New Category</h3>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Category name (e.g. Jewellery)"
                                value={newName}
                                onChange={e => { setNewName(e.target.value); setAddError(''); }}
                                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                            />
                            {newName && (
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem' }}>
                                    Slug: <code>{nameToSlug(newName)}</code>
                                </p>
                            )}
                            {addError && (
                                <p style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '0.4rem' }}>{addError}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
                            onClick={handleAddCategory}
                        >
                            <PlusCircle size={18} /> Add Category
                        </button>
                    </div>
                </div>

                {/* Category cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {categories.map((cat, idx) => (
                        <div key={cat.slug} style={{
                            padding: '1.25rem', background: '#f9fafb',
                            borderRadius: '1rem', border: '1px solid #e5e7eb',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                            position: 'relative'
                        }}>
                            {/* Delete button */}
                            <button
                                type="button"
                                title="Delete category"
                                onClick={() => handleDeleteRequest(idx, cat)}
                                style={{
                                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#ef4444', padding: '0.25rem', borderRadius: '0.5rem',
                                    display: 'flex', alignItems: 'center'
                                }}
                            >
                                <Trash2 size={18} />
                            </button>

                            {/* Image */}
                            <div style={{ width: '130px', height: '130px' }}>
                                {cat.image ? (
                                    <img
                                        src={getImageUrl(cat.image)}
                                        alt={cat.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%', height: '100%', borderRadius: '50%',
                                        background: '#e5e7eb', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', color: '#9ca3af', fontSize: '0.8rem'
                                    }}>
                                        No image
                                    </div>
                                )}
                            </div>

                            <h3 style={{ fontSize: '1rem', margin: 0, textAlign: 'center' }}>{cat.name}</h3>
                            <code style={{ fontSize: '0.75rem', color: '#6b7280' }}>{cat.slug}</code>

                            {/* Upload button */}
                            <label className="btn-secondary" style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem',
                                padding: '0.5rem 1rem', width: '100%'
                            }}>
                                {uploadingObj === idx ? 'Uploading…' : (
                                    <><Upload size={15} /> {cat.image ? 'Change Image' : 'Upload Image'}</>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageUpload(e, idx)}
                                    disabled={uploadingObj === idx}
                                />
                            </label>
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#6b7280' }}>
                    💡 Changes are not saved until you click <strong>Save Changes</strong>.
                </p>
            </div>
        </div>
    );
};

export default AdminCategories;
