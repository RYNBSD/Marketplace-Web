"use client";
import type { ReactNode } from "react";
import type { LocalStorage } from "~/types";
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useUpdateEffect from "react-use/lib/useUpdateEffect"
import useEffectOnce from "react-use/lib/useEffectOnce";
import { KEYS } from "~/constant";

const CartContext = createContext<TCartContext | null>(null);
const { CART } = KEYS.BROWSER.LOCALE_STORAGE;

export default function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<LocalCart>([]);

  useEffectOnce(() => {
    try {
      const localCart = localStorage.getItem(CART) ?? "";
      if (localCart.length === 0) return;
      const cart = JSON.parse(localCart);
      setCart(cart);
    } catch (error) {
      console.error(error);
    }
  });

  useUpdateEffect(() => {
    if (cart?.length === 0) return;
    const stringify = JSON.stringify(cart);
    localStorage.setItem(CART, stringify);
  }, [cart])

  const addToCart = useCallback((option: CartOption) => {
    setCart((prev) => [...prev, option]);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const changeQuantityOfProduct = useCallback((id: string, value: 1 | -1) => {
    setCart((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          c.quantity += value;
          return c;
        }
        return c;
      })
    );
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantityOfProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

type LocalCart = LocalStorage["cart"];
type CartOption = LocalCart[number];

type TCartContext = {
  cart: LocalStorage["cart"];
  addToCart: (option: CartOption) => void;
  removeFromCart: (id: string) => void;
  changeQuantityOfProduct: (id: string, value: 1 | -1) => void;
};

type Props = {
  children: ReactNode;
};

export const useCart = () => useContext(CartContext);
