# E-Commerce Application with Authentication & Admin Dashboard

A complete React-based e-commerce application with user authentication, shopping cart, checkout, payment processing, and admin product management.

## Features

### 🛍️ Shopping

- Browse products by category
- Add/remove items from cart
- Update quantities
- View product details with discounts

### 🔐 Authentication

- User registration
- User login
- Persistent authentication using localStorage
- Demo accounts for testing

### 🛒 Shopping Experience

- Shopping cart with quantity management
- Checkout process with shipping information
- Payment processing with multiple payment methods
- Order confirmation with tracking

### 👨‍💼 Admin Features

- Product management (Create, Read, Update, Delete)
- View all products in a table format
- Edit product details
- Delete products
- Add new products with images

## Demo Credentials

### Admin Account

- Email: `admin@example.com`
- Password: `admin123`

### Regular User Account

- Email: `user@example.com`
- Password: `user123`

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to project directory:

```bash
cd ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to:

```
http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── AdminDashboard.jsx
│   ├── AdminProductForm.jsx
│   ├── AdminProductList.jsx
│   ├── Checkout.jsx
│   ├── Header.jsx
│   ├── Login.jsx
│   ├── Payment.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── Register.jsx
│   ├── ShoppingCart.jsx
│   ├── OrderConfirmation.jsx
│   └── Footer.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── styles/
│   ├── AdminDashboard.css
│   ├── AdminProductForm.css
│   ├── AdminProductList.css
│   ├── Checkout.css
│   ├── Login.css
│   ├── Payment.css
│   ├── Register.css
│   └── ...other styles
├── data/
│   └── products.js
├── App.jsx
└── main.jsx
```

## API Integration

The application currently uses **Mock API** for development. To switch to a real API:

1. Open `src/services/api.js`
2. Update `API_BASE_URL` to your backend URL
3. Set `USE_MOCK_API = false`

### Expected API Endpoints

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

#### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

#### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

## How to Use

### For Customers

1. **Browse Products**

   - Select a category from the filter
   - Click "Add to Cart" on any product

2. **Checkout**

   - Click the cart icon in the header
   - Click "Proceed to Checkout"
   - Enter shipping information
   - Proceed to payment

3. **Payment**

   - Choose payment method (Credit Card, PayPal, or Bank Transfer)
   - Enter payment details
   - Review order summary
   - Complete payment

4. **Order Confirmation**
   - View order details
   - See tracking information
   - Confirmation email notification

### For Admins

1. **Login as Admin**

   - Use admin credentials: `admin@example.com` / `admin123`

2. **Access Admin Dashboard**

   - Click the "⚙️ Admin" button in the header
   - Opens product management interface

3. **Manage Products**
   - **Add Product**: Click "+ Add New Product"
   - **Edit Product**: Click the edit (✏️) button
   - **Delete Product**: Click the delete (🗑️) button
   - Fill in product details including name, price, discount, category, and image URL

## Technologies Used

- **React** - UI Library
- **React Context API** - State Management
- **CSS3** - Styling
- **LocalStorage** - Persistent Authentication
- **Vite** - Build tool

## Key Features Implementation

### Authentication

- Context API for global auth state
- LocalStorage for persistent login
- Protected routes and features

### Shopping Cart

- Add/remove items
- Update quantities
- Real-time total calculation with discounts

### Checkout Flow

- Multi-step form with validation
- Shipping information collection
- Order summary display

### Admin Dashboard

- Product list with table format
- Create/Edit/Delete operations
- Image preview for products
- Form validation

## Form Validation

All forms include comprehensive validation:

- Required field checking
- Email format validation
- Password confirmation
- Card number format (16 digits)
- CVV validation (3-4 digits)
- Price and discount validation

## Responsive Design

The application is fully responsive and works on:

- Desktop (1200px and above)
- Tablet (768px - 1199px)
- Mobile (below 768px)

## Future Enhancements

- Backend API integration with Node.js/Express
- Database integration (MongoDB/PostgreSQL)
- User profiles and order history
- Advanced product filtering and search
- Wishlist functionality
- Product reviews and ratings
- Email notifications
- Payment gateway integration (Stripe, PayPal)
- Inventory management
- Order tracking system

## Notes

- This application uses mock data for demonstration
- All authentication data is stored in localStorage
- Products are stored in memory (reset on page refresh)
- For production, replace mock API with real backend

## Support

For issues or questions, please refer to the component documentation within each file.
