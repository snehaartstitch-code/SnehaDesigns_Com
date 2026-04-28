import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem('sneha_favorites');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('sneha_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.some((p) => p.slug === product.slug);
            if (exists) {
                return prev.filter((p) => p.slug !== product.slug);
            } else {
                return [...prev, product];
            }
        });
    };

    const isFavorite = (slug) => favorites.some((p) => p.slug === slug);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
