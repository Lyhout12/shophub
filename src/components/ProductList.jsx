import ProductCard from './ProductCard';
import '../styles/ProductList.css';

export default function ProductList({ products, selectedCategory, onAddToCart }) {
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-list">
      <h2>
        {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
        <span className="product-count">({filteredProducts.length})</span>
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
