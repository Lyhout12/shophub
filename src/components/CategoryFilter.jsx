import '../styles/CategoryFilter.css';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-buttons">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.name)}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
