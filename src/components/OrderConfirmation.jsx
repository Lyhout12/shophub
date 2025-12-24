import '../styles/OrderConfirmation.css';

export default function OrderConfirmation({ order, onContinueShopping }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase</p>
        </div>

        <div className="confirmation-content">
          <div className="order-details">
            <div className="detail-row">
              <span className="label">Order ID:</span>
              <span className="value">{order.orderId}</span>
            </div>
            <div className="detail-row">
              <span className="label">Order Date:</span>
              <span className="value">{order.orderDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">Estimated Delivery:</span>
              <span className="value">{order.estimatedDelivery}</span>
            </div>
            <div className="detail-row">
              <span className="label">Payment Method:</span>
              <span className="value">
                {order.paymentMethod === 'credit-card' ? (
                  `Credit Card ending in ${order.paymentData.cardLast4}`
                ) : order.paymentMethod === 'paypal' ? (
                  'PayPal'
                ) : (
                  'Bank Transfer'
                )}
              </span>
            </div>
          </div>

          <div className="order-items-section">
            <h3>Items Ordered</h3>
            <div className="items-list">
              {order.cartItems.map(item => (
                <div key={item.id} className="item-row">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="item-price">
                    ${(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <div className="address-box">
              <p><strong>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</strong></p>
              <p>{order.shippingInfo.email}</p>
              <p>{order.shippingInfo.address}</p>
              <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
              <p>{order.shippingInfo.country}</p>
              <p>Phone: {order.shippingInfo.phone}</p>
            </div>
          </div>

          <div className="order-total">
            <span>Total Amount Paid:</span>
            <span>${order.totalAmount}</span>
          </div>

          <div className="confirmation-message">
            <p>A confirmation email has been sent to <strong>{order.shippingInfo.email}</strong></p>
            <p>You can track your order using the Order ID above.</p>
          </div>

          <button className="continue-shopping-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
