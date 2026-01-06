import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Minus, Plus, Shield, Truck, ArrowLeft } from 'lucide-react'
import { products } from '../data/products'

const ProductDetail = () => {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                -{discountPercentage}% OFF
              </div>
            )}
            <div className="absolute top-4 right-4">
              {product.inStock ? (
                <span className="bg-green-500 text-white text-sm px-3 py-1 rounded">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-primary-600 font-medium mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  Save {discountPercentage}%
                </span>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  product.inStock
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 inline mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">100% Genuine</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'dosage', label: 'Dosage & Usage' },
              { id: 'sideEffects', label: 'Side Effects' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'dosage' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Dosage Instructions</h3>
              <p className="text-gray-700">{product.dosage}</p>
            </div>
          )}

          {activeTab === 'sideEffects' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Possible Side Effects</h3>
              <p className="text-gray-700">{product.sideEffects}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Always consult with a healthcare professional before starting any new medication.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Write a Review
                </button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <p>Reviews feature coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="card">
                <Link to={`/product/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${relatedProduct.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

