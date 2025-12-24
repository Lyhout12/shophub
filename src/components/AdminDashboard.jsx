import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import AdminProductList from './AdminProductList';
import AdminProductForm from './AdminProductForm';
import '../styles/AdminDashboard.css';

export default function AdminDashboard({ onClose }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      let updatedProduct;
      if (editingProduct) {
        updatedProduct = await productsAPI.update(editingProduct.id, productData);
        setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      } else {
        updatedProduct = await productsAPI.create(productData);
        setProducts([...products, updatedProduct]);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h2>Admin Dashboard - Product Management</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="admin-content">
          {error && <div className="error-banner">{error}</div>}

          {!showForm ? (
            <>
              <div className="admin-toolbar">
                <button className="add-product-btn" onClick={handleAddProduct}>
                  + Add New Product
                </button>
              </div>

              {loading ? (
                <div className="loading">Loading products...</div>
              ) : (
                <AdminProductList
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              )}
            </>
          ) : (
            <AdminProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
