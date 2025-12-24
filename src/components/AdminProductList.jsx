import '../styles/AdminProductList.css';

export default function AdminProductList({ products, onEdit, onDelete }) {
  return (
    <div className="admin-product-list">
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr className="empty-row">
              <td colSpan="7" className="empty-message">No products found. Add your first product!</td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id} className="product-row">
                <td>{product.id}</td>
                <td className="product-name">{product.name}</td>
                <td>{product.category}</td>
                <td className="price">${product.price.toFixed(2)}</td>
                <td className="discount">{product.discount}%</td>
                <td className="description">{product.description?.substring(0, 50)}...</td>
                <td className="actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => onEdit(product)}
                    title="Edit product"
                  >
                    ✏️
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => onDelete(product.id)}
                    title="Delete product"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
