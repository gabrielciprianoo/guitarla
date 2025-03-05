import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
function App() {

  const [guitars, setGuitars] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) {
      const updatedCart = [...cart]
      if(updatedCart[itemExists].quantity >= MAX_ITEMS) return
      updatedCart[itemExists].quantity++
      return setCart(updatedCart)
    }

    item.quantity = 1
    setCart([...cart, item])
  }

  function removeFromCart(id) {
   
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        item.quantity++
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        item.quantity--
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
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

          {guitars.map(guitar => (
            <Guitar
              guitar={guitar}
              key={guitar.id}
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
