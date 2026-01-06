const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    shortDescription: {
      type: String,
      maxlength: [500, 'Short description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    comparePrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required']
    },
    images: [{
      url: {
        type: String,
        required: true
      },
      alt: String,
      isPrimary: {
        type: Boolean,
        default: false
      }
    }],
    
    // Ayurvedic-specific fields
    ingredients: [{
      name: {
        type: String,
        required: true
      },
      quantity: String,
      percentage: Number,
      sanskritName: String,
      description: String
    }],
    benefits: [{
      type: String,
      trim: true
    }],
    dosage: {
      adults: String,
      children: String,
      frequency: String,
      bestTime: String,
      instructions: String
    },
    contraindications: [{
      type: String,
      trim: true
    }],
    sideEffects: [{
      type: String,
      trim: true
    }],
    certifications: [{
      name: {
        type: String,
        enum: ['Organic', 'GMP Certified', 'FDA Approved', 'Ayush Certified', 'Non-GMO', 'Vegan', 'Gluten-Free']
      },
      certificateNumber: String,
      validUntil: Date
    }],
    dosha: [{
      type: String,
      enum: ['Vata', 'Pitta', 'Kapha']
    }],
    
    // Inventory
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative']
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    
    // Product attributes
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['g', 'kg', 'ml', 'l', 'tablets', 'capsules'],
        default: 'g'
      }
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ['cm', 'in'],
        default: 'cm'
      }
    },
    
    // Reviews and ratings
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
    
    // Product status
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    
    // SEO
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    
    // Additional info
    manufacturer: String,
    expiryDate: Date,
    shelfLife: String,
    storageInstructions: String,
    tags: [String]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Generate SKU if not provided
productSchema.pre('save', function(next) {
  if (!this.sku && this.isNew) {
    this.sku = `AYU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'Out of Stock';
  if (this.stock < 10) return 'Low Stock';
  return 'In Stock';
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ slug: 1 });

module.exports = mongoose.model('Product', productSchema);

