'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sleaze-cart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sleaze-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.variant === item.variant);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

