import { useState } from 'react';
import '../styles/Payment.css';

export default function Payment({ cartItems, totalAmount, shippingInfo, onClose, onPaymentSuccess }) {
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const validatePaymentForm = () => {
    const newErrors = {};

    if (paymentMethod === 'credit-card') {
      if (!paymentData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
      if (!paymentData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!paymentData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = 'Expiry date must be MM/YY format';
      }
      if (!paymentData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = 'CVV must be 3-4 digits';
      }
    }

    if (!paymentData.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required';
    if (!paymentData.billingCity.trim()) newErrors.billingCity = 'Billing city is required';
    if (!paymentData.billingState.trim()) newErrors.billingState = 'Billing state is required';
    if (!paymentData.billingZipCode.trim()) newErrors.billingZipCode = 'Billing zip code is required';
    if (!paymentData.billingCountry.trim()) newErrors.billingCountry = 'Billing country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').slice(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }

    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (validatePaymentForm()) {
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        const orderData = {
          orderId: 'ORD-' + Date.now(),
          shippingInfo,
          paymentMethod,
          paymentData: paymentMethod === 'credit-card' 
            ? { cardLast4: paymentData.cardNumber.slice(-4) }
            : { paypalEmail: paymentData.paypalEmail },
          cartItems,
          totalAmount,
          orderDate: new Date().toLocaleDateString(),
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
        };

        setProcessing(false);
        onPaymentSuccess(orderData);
      }, 2000);
    }
  };

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-header">
          <h2>Payment</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="payment-content">
          <div className="payment-form-section">
            <h3>Payment Method</h3>
            
            <div className="payment-methods">
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>PayPal</span>
              </label>
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={paymentMethod === 'bank-transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Bank Transfer</span>
              </label>
            </div>

            <form onSubmit={handlePaymentSubmit} className="payment-form">
              {paymentMethod === 'credit-card' && (
                <>
                  <div className="form-group">
                    <label htmlFor="cardholderName">Cardholder Name *</label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={errors.cardholderName ? 'input-error' : ''}
                    />
                    {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={errors.cardNumber ? 'input-error' : ''}
                    />
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={errors.expiryDate ? 'input-error' : ''}
                      />
                      {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={errors.cvv ? 'input-error' : ''}
                      />
                      {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'paypal' && (
                <div className="payment-info">
                  <p>You will be redirected to PayPal to complete the payment securely.</p>
                </div>
              )}

              {paymentMethod === 'bank-transfer' && (
                <div className="payment-info">
                  <p>Please transfer the amount to the bank account details provided after order confirmation.</p>
                </div>
              )}

              <h3>Billing Address</h3>
              <div className="form-group">
                <label htmlFor="billingAddress">Street Address *</label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  value={paymentData.billingAddress}
                  onChange={handleInputChange}
                  className={errors.billingAddress ? 'input-error' : ''}
                />
                {errors.billingAddress && <span className="error-text">{errors.billingAddress}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billingCity">City *</label>
                  <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={paymentData.billingCity}
                    onChange={handleInputChange}
                    className={errors.billingCity ? 'input-error' : ''}
                  />
                  {errors.billingCity && <span className="error-text">{errors.billingCity}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="billingState">State/Province *</label>
                  <input
                    type="text"
                    id="billingState"
                    name="billingState"
                    value={paymentData.billingState}
                    onChange={handleInputChange}
                    className={errors.billingState ? 'input-error' : ''}
                  />
                  {errors.billingState && <span className="error-text">{errors.billingState}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billingZipCode">Zip/Postal Code *</label>
                  <input
                    type="text"
                    id="billingZipCode"
                    name="billingZipCode"
                    value={paymentData.billingZipCode}
                    onChange={handleInputChange}
                    className={errors.billingZipCode ? 'input-error' : ''}
                  />
                  {errors.billingZipCode && <span className="error-text">{errors.billingZipCode}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="billingCountry">Country *</label>
                  <input
                    type="text"
                    id="billingCountry"
                    name="billingCountry"
                    value={paymentData.billingCountry}
                    onChange={handleInputChange}
                    className={errors.billingCountry ? 'input-error' : ''}
                  />
                  {errors.billingCountry && <span className="error-text">{errors.billingCountry}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={onClose}>Back</button>
                <button type="submit" className="pay-btn" disabled={processing}>
                  {processing ? 'Processing...' : `Pay $${totalAmount}`}
                </button>
              </div>
            </form>
          </div>

          <div className="payment-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
            <div className="shipping-info">
              <h4>Shipping To:</h4>
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
              <p>{shippingInfo.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
