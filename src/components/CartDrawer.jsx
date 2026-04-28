import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/helpers';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
    } = useCart();

    const buildWhatsAppMessage = () => {
        const lines = cartItems.map(item =>
            `• ${item.name}${item.variant ? ` (${item.variant})` : ''} × ${item.quantity} = ₹${item.price * item.quantity}`
        );
        const msg = `Hi Sneha Designs! I'd like to order:\n\n${lines.join('\n')}\n\nTotal: ₹${cartTotal}\nPincode: \nAddress: `;
        return encodeURIComponent(msg);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`cart-backdrop${isCartOpen ? ' cart-backdrop--open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <aside className={`cart-drawer${isCartOpen ? ' cart-drawer--open' : ''}`} aria-label="Shopping Cart">
                {/* Header */}
                <div className="cart-drawer__header">
                    <div className="cart-drawer__title">
                        <ShoppingBag size={20} />
                        <span>Your Cart</span>
                        {cartCount > 0 && <span className="cart-drawer__count">{cartCount}</span>}
                    </div>
                    <button className="cart-drawer__close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="cart-drawer__body">
                    {cartItems.length === 0 ? (
                        <div className="cart-drawer__empty">
                            <ShoppingBag size={48} strokeWidth={1.2} />
                            <p>Your cart is empty</p>
                            <span>Add some beautiful handmade items!</span>
                        </div>
                    ) : (
                        <ul className="cart-drawer__list">
                            {cartItems.map(item => (
                                <li key={item.key} className="cart-item">
                                    <div className="cart-item__img">
                                        {item.image ? (
                                            <img src={getImageUrl(item.image)} alt={item.name} loading="lazy" />
                                        ) : (
                                            <div className="cart-item__img-placeholder" />
                                        )}
                                    </div>
                                    <div className="cart-item__info">
                                        <p className="cart-item__name">{item.name}</p>
                                        {item.variant && (
                                            <p className="cart-item__variant">{item.variant}</p>
                                        )}
                                        <p className="cart-item__price">₹{item.price}</p>
                                        <div className="cart-item__controls">
                                            <button
                                                className="cart-item__qty-btn"
                                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="cart-item__qty">{item.quantity}</span>
                                            <button
                                                className="cart-item__qty-btn"
                                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-item__right">
                                        <span className="cart-item__subtotal">₹{item.price * item.quantity}</span>
                                        <button
                                            className="cart-item__remove"
                                            onClick={() => removeFromCart(item.key)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-drawer__footer">
                        <div className="cart-drawer__total">
                            <span>Subtotal</span>
                            <strong>₹{cartTotal}</strong>
                        </div>
                        <p className="cart-drawer__note">Shipping calculated at checkout via WhatsApp</p>
                        <a
                            href={`https://wa.me/917419150418?text=${buildWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cart-drawer__order-btn"
                            onClick={() => setIsCartOpen(false)}
                        >
                            Order via WhatsApp
                        </a>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
