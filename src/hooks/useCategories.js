import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const defaultCategories = [
    { name: "Crochet Gifts",   slug: "crochet-gifts",    image: "./images/Crochet Kids Toys (Mini Dogs).jpeg" },
    { name: "Hair Accessories", slug: "hair-accessories", image: "./images/Floral Hair Clips.jpeg" },
    { name: "Baby Items",       slug: "baby-items",       image: "./images/babycrochetbooties.png" },
    { name: "Home Décor",       slug: "home-decor",       image: "./images/Floral Handmade Wall Decor.jpeg" },
    { name: "Keychains",        slug: "keychains",        image: "./images/Keychain Accessories (Strawberries).jpeg" },
    { name: "Bags",             slug: "bags",             image: "./images/Crochet Bag.jpeg" }
];

export function useCategories() {
    const [categories, setCategories] = useState(defaultCategories);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data } = await supabase
                .from('products')
                .select('description')
                .eq('id', 'system-categories')
                .single();

            if (data?.description) {
                const parsed = JSON.parse(data.description);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setCategories(parsed);
                } else {
                    setCategories(defaultCategories);
                }
            } else {
                setCategories(defaultCategories);
            }
        } catch {
            setCategories(defaultCategories);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, refreshCategories: fetchCategories };
}
