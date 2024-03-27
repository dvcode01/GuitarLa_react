import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "../data/db";

function App() {
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

  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
    />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
