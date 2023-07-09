import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [contextCartItems, setCartItems] = useState([]);

    const addToCartContext = (product) => {
        if (product?.length) {
            setCartItems([...contextCartItems, ...product]);
            return;
        }
        setCartItems([...contextCartItems, product]);
    };

    const removeFromCartContext = (data) => {
        setCartItems(contextCartItems.filter(item => item.stock_id !== data.stock_id));
    };

    return (
        <CartContext.Provider value={{ contextCartItems, addToCartContext, removeFromCartContext }}>
            {children}
        </CartContext.Provider>
    );
};
