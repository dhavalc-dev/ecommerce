# 🌿 Ayurvedic Ecommerce Platform

A full-stack ecommerce website for selling Ayurvedic products built with the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### Customer Features
- 🛍️ Browse products with advanced filtering and search
- 📦 Product categories (Herbs, Oils, Supplements, Tea, Skincare)
- 🔍 Detailed product information including benefits, ingredients, and dosage
- 🛒 Shopping cart functionality
- 💳 Secure checkout process
- 👤 User authentication and profile management
- 📜 Order history tracking
- ⭐ Product reviews and ratings

### Ayurvedic-Specific Features
- 🌱 Ingredient breakdown for each product
- 💊 Dosage information and usage instructions
- ✅ Ayurvedic certifications and badges
- 🏥 Health benefits and contraindications
- 📚 Traditional Ayurvedic wisdom integration

### Admin Features
- 📊 Dashboard with sales analytics
- ➕ Add, edit, and delete products
- 📦 Order management and status updates
- 🏷️ Category management
- 👥 User management

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool for faster development
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/dhavalc-dev/ecommerce.git
cd ecommerce
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:
```bash
cd backend
cp ../.env.example .env
```

Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ayurvedic-ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

### 4. Seed the Database (Optional)
```bash
cd backend
npm run seed
```

This will populate your database with sample Ayurvedic products and categories.

## 🚀 Running the Application

### Development Mode

#### Option 1: Run both frontend and backend together
```bash
# From root directory
npm run dev
```

#### Option 2: Run separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

### Production Mode

#### Build the frontend
```bash
cd frontend
npm run build
```

#### Start the backend server
```bash
cd backend
npm start
```

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## 📁 Project Structure

```
ayurvedic-ecommerce/
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── seeders/            # Database seeders
│   └── server.js           # Entry point
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── store/         # Redux store
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main App component
│   └── public/            # Static assets
│
├── docs/                   # Documentation
├── .env.example           # Environment variables template
├── docker-compose.yml     # Docker configuration
└── package.json           # Root package file
```

## 🔑 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/admin/orders/:id` - Update order status (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove cart item

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)

## 👥 Default Admin Account

After seeding the database, use these credentials:
- **Email**: admin@ayurveda.com
- **Password**: admin123

⚠️ **Important**: Change the admin password immediately in production!

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend (Node.js)
Deploy to platforms like:
- Heroku
- DigitalOcean
- AWS EC2
- Railway
- Render

### Frontend (React)
Deploy to platforms like:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

### Database
- MongoDB Atlas (recommended for production)
- Self-hosted MongoDB

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@ayurveda.com or create an issue in the repository.

## 🙏 Acknowledgments

- Ayurvedic product information sourced from traditional texts and modern research
- Icons and images from various open-source resources
- Community contributors

---

Built with ❤️ for promoting natural wellness through Ayurveda
