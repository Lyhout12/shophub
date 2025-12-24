import '../styles/ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.discount > 0 && (
          <div className="discount-badge">-{product.discount}%</div>
        )}
        {!product.inStock && (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <span className="stars">⭐ {product.rating}</span>
          <span className="reviews">({product.reviews} reviews)</span>
        </div>

        <div className="product-price">
          {product.discount > 0 ? (
            <>
              <span className="original-price">${product.price.toFixed(2)}</span>
              <span className="final-price">${discountedPrice}</span>
            </>
          ) : (
            <span className="final-price">${product.price.toFixed(2)}</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
