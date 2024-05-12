import { useState, useEffect, useMemo } from "react";
import { db } from "../../data/db";

export function useCart() {
  const auth = true;

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const maxItem = 5;
  const minItem = 1;

  // Guarda los datos en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  // Agrega elementos al carrito
  function addToCart(item){
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    // Existe un item duplicado
    if(itemExists >= 0){
      if(cart[itemExists].quantity>= maxItem) return;
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;

      setCart(updateCart);
    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  // Elimina los elementos del carrito
  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  // Incrementa la cantidad de elementos en el carrito
  function increaseQuantity(id){
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
  function decreaseQuantity(id){
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

  // State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty, 
    cartTotal
  }
}

