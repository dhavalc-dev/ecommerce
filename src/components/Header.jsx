import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Heart, User, Phone } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>24/7 Support: +1-800-MEDICARE</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>Free shipping on orders over $50</span>
              <span>•</span>
              <span>Same day delivery available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <span className="text-xl font-bold">💊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MediCare</h1>
              <p className="text-xs text-gray-500">Your Health Partner</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines, supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button className="md:hidden text-gray-600 hover:text-primary-600">
              <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:block text-gray-600 hover:text-primary-600 relative">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="text-gray-600 hover:text-primary-600 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Account */}
            <button className="hidden sm:block text-gray-600 hover:text-primary-600">
              <User className="h-6 w-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-4 border-t border-gray-100">
          <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">
            All Products
          </Link>
          <Link to="/products?category=Pain Relief" className="text-gray-700 hover:text-primary-600">
            Pain Relief
          </Link>
          <Link to="/products?category=Vitamins & Supplements" className="text-gray-700 hover:text-primary-600">
            Vitamins
          </Link>
          <Link to="/products?category=Cold & Flu" className="text-gray-700 hover:text-primary-600">
            Cold & Flu
          </Link>
          <Link to="/products?category=First Aid" className="text-gray-700 hover:text-primary-600">
            First Aid
          </Link>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
              ✓ Licensed Pharmacy
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              🚚 Fast Delivery
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="space-y-3">
              <Link
                to="/"
                className="block text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/products?category=Pain Relief"
                className="block text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Pain Relief
              </Link>
              <Link
                to="/products?category=Vitamins & Supplements"
                className="block text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Vitamins & Supplements
              </Link>
              <Link
                to="/products?category=Cold & Flu"
                className="block text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Cold & Flu
              </Link>
            </nav>

            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <User className="h-5 w-5" />
                <span>My Account</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <Heart className="h-5 w-5" />
                <span>Wishlist (2)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

