import { useState } from 'react';
import '../styles/AdminProductForm.css';

const CATEGORIES = ['electronics', 'accessories', 'clothing', 'books', 'home', 'sports'];

export default function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState(product || {
    name: '',
    price: '',
    discount: 0,
    category: 'electronics',
    description: '',
    image: 'https://via.placeholder.com/250x250?text=Product'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (formData.discount < 0 || formData.discount > 100) newErrors.discount = 'Discount must be between 0-100';
    if (!formData.category?.trim()) newErrors.category = 'Category is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.image?.trim()) newErrors.image = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discount' ? parseFloat(value) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'input-error' : ''}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className={errors.price ? 'input-error' : ''}
              placeholder="0.00"
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="discount">Discount (%) *</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className={errors.discount ? 'input-error' : ''}
            />
            {errors.discount && <span className="error-text">{errors.discount}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'input-error' : ''}
            placeholder="Enter product description"
            rows="3"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL *</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? 'input-error' : ''}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
        </div>

        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Product preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
