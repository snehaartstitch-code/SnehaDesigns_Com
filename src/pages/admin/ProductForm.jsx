import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './Admin.css';

const ProductForm = () => {
    const { id } = useParams();
    const isNew = id === 'new';
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [uploading, setUploading] = useState(false);
    
    const [formData, setFormData] = useState({
        id: '',
        slug: '',
        name: '',
        price: '',
        category: 'crochet-gifts',
        description: '',
        tags: '',
        highlights: '',
        options: '',
        images: []
    });

    useEffect(() => {
        if (!isNew) {
            const fetchProduct = async () => {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (data) {
                    setFormData({
                        ...data,
                        tags: data.tags?.join(', ') || '',
                        highlights: data.highlights?.join('\n') || '',
                        options: data.options?.join(', ') || '',
                        images: data.images || []
                    });
                }
                setFetching(false);
            };
            fetchProduct();
        }
    }, [id, isNew]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, publicUrl]
            }));

        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
        const highlightsArray = formData.highlights.split('\n').map(h => h.trim()).filter(Boolean);
        const optionsArray = formData.options.split(',').map(o => o.trim()).filter(Boolean);

        const productPayload = {
            id: isNew ? Date.now().toString() : formData.id,
            slug: formData.slug || formData.name.toLowerCase().replace(/\\s+/g, '-'),
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            description: formData.description,
            tags: tagsArray,
            highlights: highlightsArray,
            options: optionsArray,
            images: formData.images
        };

        let result;
        if (isNew) {
            result = await supabase.from('products').insert([productPayload]);
        } else {
            result = await supabase.from('products').update(productPayload).eq('id', id);
        }

        if (result.error) {
            alert('Error saving product: ' + result.error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    if (fetching) return <div className="section-padding text-center">Loading product...</div>;

    return (
        <div className="admin-dashboard">
            <button onClick={() => navigate('/admin')} className="btn-secondary" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={18} /> Back to Dashboard
            </button>
            
            <div className="admin-form-container">
                <h1 style={{ marginTop: 0 }}>{isNew ? 'Add New Product' : 'Edit Product'}</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="admin-form-grid">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" className="form-input" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input type="number" className="form-input" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>URL Slug (e.g. blue-blanket)</label>
                            <input type="text" className="form-input" name="slug" value={formData.slug} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select className="form-input" name="category" value={formData.category} onChange={handleChange} required>
                                <option value="crochet-gifts">Crochet Gifts</option>
                                <option value="hair-accessories">Hair Accessories</option>
                                <option value="baby-items">Baby Items</option>
                                <option value="home-decor">Home Décor</option>
                                <option value="keychains">Keychains</option>
                                <option value="bags">Bags</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label>Description</label>
                        <textarea className="form-textarea" name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
                    </div>

                    <div className="admin-form-grid" style={{ marginTop: '1.5rem' }}>
                        <div className="form-group">
                            <label>Tags (Comma separated - e.g. ready, best-seller, new)</label>
                            <input type="text" className="form-input" name="tags" value={formData.tags} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Options/Variants (Comma separated - e.g. Red, Blue, Small)</label>
                            <input type="text" className="form-input" name="options" value={formData.options} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label>Highlights (One per line)</label>
                        <textarea className="form-textarea" name="highlights" rows="4" value={formData.highlights} onChange={handleChange} placeholder="100% Cotton\nHandmade\nWashable"></textarea>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label>Product Images</label>
                        
                        <div className="image-preview-container">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="image-preview">
                                    <img src={img} alt={`Product ${idx}`} />
                                    <button type="button" className="remove-image-btn" onClick={() => removeImage(idx)}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label htmlFor="image-upload" className="image-upload-area" style={{ display: 'block' }}>
                                <Upload size={32} color="var(--color-accent)" style={{ margin: '0 auto 1rem auto' }} />
                                <div>{uploading ? 'Uploading...' : 'Click to upload image'}</div>
                            </label>
                            <input 
                                id="image-upload" 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                style={{ display: 'none' }} 
                                disabled={uploading}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" className="btn-secondary" onClick={() => navigate('/admin')}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
