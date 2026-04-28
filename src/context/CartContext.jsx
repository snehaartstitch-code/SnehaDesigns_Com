import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('sneha_cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('sneha_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, variant = '', qty = 1) => {
        const key = `${product.slug}__${variant}`;
        setCartItems(prev => {
            const existing = prev.find(i => i.key === key);
            if (existing) {
                return prev.map(i =>
                    i.key === key ? { ...i, quantity: i.quantity + qty } : i
                );
            }
            return [...prev, {
                key,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || '',
                variant,
                quantity: qty,
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (key) => {
        setCartItems(prev => prev.filter(i => i.key !== key));
    };

    const updateQuantity = (key, qty) => {
        if (qty < 1) return removeFromCart(key);
        setCartItems(prev => prev.map(i => i.key === key ? { ...i, quantity: qty } : i));
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
