import { useState, useEffect} from "react";
import type { Guitar, CartItem } from "../types/types";

export function useCart() {

  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [cart, setCart] = useState(initialCart);

  const maxItem = 5;
  const minItem = 1;

  // Guarda los datos en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])


  // Incrementa la cantidad de elementos en el carrito
  function increaseQuantity(id : Guitar['id']){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < maxItem){
        return{
          ...item, 
          quantity: item.quantity + 1
        }
      }

      return item;
    })

    setCart(updateCart);
  }

  // Reduce la cantidad de elementos en el carrito
  function decreaseQuantity(id: Guitar['id']){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > minItem){
        return{
          ...item, 
          quantity: item.quantity - 1
        }
      }

      return item;
    })

    setCart(updatedCart);
  }

  // Vacia por completo el carrito
  function clearCart(){
    setCart([]);
  }

 

  return {
    cart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }
}

