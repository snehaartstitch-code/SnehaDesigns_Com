import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('id');
                
                if (error) throw error;
                if (data) setProducts(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { productsData: products, loading, error };
}
