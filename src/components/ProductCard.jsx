import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'

const ProductCard = ({ product, className = '' }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-300 group ${className}`}>
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute top-2 right-2">
          {product.inStock ? (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Add to Wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button
            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
            title="Add to Cart"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-primary-600 font-medium mb-1">
          {product.category}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            product.inStock
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard

