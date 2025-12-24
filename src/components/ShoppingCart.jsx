import '../styles/ShoppingCart.css';

export default function ShoppingCart({ cartItems, onClose, onRemove, onUpdateQuantity, onCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountTotal = cartItems.reduce((sum, item) => {
    const discount = item.price * (item.discount / 100) * item.quantity;
    return sum + discount;
  }, 0);
  const finalTotal = (total - discountTotal).toFixed(2);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">
                      ${(item.price * (1 - item.discount / 100)).toFixed(2)} each
                    </p>
                  </div>

                  <div className="cart-item-quantity">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <div className="cart-item-total">
                    ${(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount:</span>
                <span className="discount">-${discountTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${finalTotal}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
              <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
