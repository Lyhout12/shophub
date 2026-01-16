import { useState } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import OrderConfirmation from './components/OrderConfirmation'
import Footer from './components/Footer'
import { products, categories } from './data/products'
import './styles/index.css'
import './App.css'

function AppContent() {
  // AuthContext removed
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [shippingInfo, setShippingInfo] = useState(null)
  const [order, setOrder] = useState(null)

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    setShowCart(false)
    setShowCheckout(true)
  }

  const handleProceedToPayment = (formData) => {
    setShippingInfo(formData)
    setShowCheckout(false)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (orderData) => {
    setOrder(orderData)
    setShowPayment(false)
    setShowConfirmation(true)
    // Clear cart after successful payment
    setCartItems([])
  }

  const handleContinueShopping = () => {
    setShowConfirmation(false)
    setShippingInfo(null)
    setOrder(null)
  }

  return (
    <>
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setShowCart(true)}
      />

      <main className="main-content">
        <div className="container">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <ProductList
            products={products}
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      <Footer />

      {showCart && (
        <ShoppingCart
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      )}

      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          totalAmount={(
            cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) -
            cartItems.reduce((sum, item) => sum + (item.price * (item.discount / 100) * item.quantity), 0)
          ).toFixed(2)}
          onClose={() => setShowCheckout(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {showPayment && (
        <Payment
          cartItems={cartItems}
          totalAmount={(
            cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) -
            cartItems.reduce((sum, item) => sum + (item.price * (item.discount / 100) * item.quantity), 0)
          ).toFixed(2)}
          shippingInfo={shippingInfo}
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {showConfirmation && order && (
        <OrderConfirmation
          order={order}
          onContinueShopping={handleContinueShopping}
        />
      )}

      {/* Login and Register UI removed */}
    </>
  )
}

function App() {
  return <AppContent />
}

export default App
