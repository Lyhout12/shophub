// Mock API Service - Uses static data and localStorage
// No backend required

// Generate a mock token
const generateToken = () => {
  return 'mock_token_' + Math.random().toString(36).substr(2, 9) + Date.now();
};

// Mock users database stored in localStorage
const getMockUsers = () => {
  const users = localStorage.getItem('mockUsers');
  return users ? JSON.parse(users) : [
    { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'password123' }
  ];
};

const saveMockUsers = (users) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

// Authentication API - Mock Implementation
export const authAPI = {
  register: async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getMockUsers();
          const trimmedEmail = email.trim().toLowerCase();
          // Check if user already exists (case-insensitive)
          if (users.find(u => u.email.trim().toLowerCase() === trimmedEmail)) {
            reject(new Error('Email already registered'));
            return;
          }
          // Validate input
          if (!name.trim()) {
            reject(new Error('Name is required'));
            return;
          }
          if (!trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            reject(new Error('Invalid email format'));
            return;
          }
          if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters'));
            return;
          }
          // Create new user
          const newUser = {
            id: users.length + 1,
            name: name.trim(),
            email: trimmedEmail,
            password: password.trim()
          };
          users.push(newUser);
          saveMockUsers(users);
          const token = generateToken();
          resolve({
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
          });
        } catch (error) {
          reject(error);
        }
      }, 500); // Simulate network delay
    });
  },

  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getMockUsers();
          const trimmedEmail = email.trim().toLowerCase();
          const trimmedPassword = password.trim();
          const user = users.find(u => u.email.trim().toLowerCase() === trimmedEmail && u.password === trimmedPassword);
          
          if (!user) {
            reject(new Error('Invalid email or password'));
            return;
          }
          
          const token = generateToken();
          
          resolve({
            token,
            user: { id: user.id, name: user.name, email: user.email }
          });
        } catch (error) {
          reject(error);
        }
      }, 500); // Simulate network delay
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('authToken');
        resolve({ success: true });
      }, 300);
    });
  },

  getCurrentUser: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = localStorage.getItem('user');
        if (user) {
          resolve(JSON.parse(user));
        } else {
          resolve(null);
        }
      }, 300);
    });
  }
};

// Products API - Mock Implementation
export const productsAPI = {
  getAll: async (category = null, search = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 300);
    });
  },

  create: async (productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productData);
      }, 300);
    });
  },

  update: async (id, productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productData);
      }, 300);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  getCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  }
};

// Orders API - Mock Implementation
export const ordersAPI = {
  create: async (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = {
          id: Date.now(),
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        resolve(order);
      }, 300);
    });
  },

  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 300);
    });
  },

  updateStatus: async (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, status });
      }, 300);
    });
  }
};

// Cart API - Mock Implementation
export const cartAPI = {
  getCart: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ items: [] });
      }, 300);
    });
  },

  addItem: async (productId, quantity) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  updateItem: async (itemId, quantity) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  removeItem: async (itemId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  clearCart: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  }
};
