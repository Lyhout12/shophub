import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header({ cartCount, onCartClick, onLoginClick, onAdminClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🛍️ ShopHub</h1>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          
          {user ? (
            <>
              <div className="user-menu">
                <span className="user-greeting">👤 {user.name}</span>
                {isAdmin && (
                  <button className="admin-btn" onClick={onAdminClick} title="Admin Dashboard">
                    ⚙️ Admin
                  </button>
                )}
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>
              Login / Register
            </button>
          )}
          
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mobile-menu">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      )}
    </header>
  );
}
