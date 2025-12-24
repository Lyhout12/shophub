// Mock API Service - can be replaced with real backend API calls
// For production, replace these URLs with your actual backend API endpoints

const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your API URL
const USE_MOCK_API = true; // Set to false when using real API

// Mock data storage
let mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123', // In production, never store plain passwords
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user'
  }
];

let mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    discount: 10,
    image: 'https://via.placeholder.com/250x250?text=Headphones',
    category: 'electronics',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'USB-C Cable',
    price: 9.99,
    discount: 0,
    image: 'https://via.placeholder.com/250x250?text=USB+Cable',
    category: 'accessories',
    description: 'Durable USB-C charging and data cable'
  }
];

// Authentication API
export const authAPI = {
  register: async (email, password, name) => {
    if (USE_MOCK_API) {
      // Check if user already exists
      if (mockUsers.find(u => u.email === email)) {
        throw new Error('User already exists with this email');
      }
      
      const newUser = {
        id: mockUsers.length + 1,
        email,
        password,
        name,
        role: 'user'
      };
      
      mockUsers.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      return {
        token: `token_${newUser.id}_${Date.now()}`,
        user: userWithoutPassword
      };
    } else {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      if (!response.ok) throw new Error('Registration failed');
      return response.json();
    }
  },

  login: async (email, password) => {
    if (USE_MOCK_API) {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      return {
        token: `token_${user.id}_${Date.now()}`,
        user: userWithoutPassword
      };
    } else {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    }
  },

  logout: async () => {
    if (USE_MOCK_API) {
      return { success: true };
    } else {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Logout failed');
      return response.json();
    }
  }
};

// Products API
export const productsAPI = {
  getAll: async () => {
    if (USE_MOCK_API) {
      return mockProducts;
    } else {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  },

  getById: async (id) => {
    if (USE_MOCK_API) {
      return mockProducts.find(p => p.id === id);
    } else {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    }
  },

  create: async (productData) => {
    if (USE_MOCK_API) {
      const newProduct = {
        id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
        ...productData
      };
      mockProducts.push(newProduct);
      return newProduct;
    } else {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    }
  },

  update: async (id, productData) => {
    if (USE_MOCK_API) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return mockProducts[index];
    } else {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    }
  },

  delete: async (id) => {
    if (USE_MOCK_API) {
      mockProducts = mockProducts.filter(p => p.id !== id);
      return { success: true };
    } else {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    }
  }
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    if (USE_MOCK_API) {
      return {
        orderId: `ORD-${Date.now()}`,
        ...orderData,
        createdAt: new Date().toISOString()
      };
    } else {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Failed to create order');
      return response.json();
    }
  },

  getAll: async () => {
    if (USE_MOCK_API) {
      return [];
    } else {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    }
  }
};
