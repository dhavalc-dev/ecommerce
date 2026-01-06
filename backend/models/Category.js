const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Category name cannot exceed 100 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
      url: String,
      alt: String
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    icon: String,
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    metaTitle: String,
    metaDescription: String
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from name before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Virtual to get products count in category
categorySchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// Virtual to get subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });

module.exports = mongoose.model('Category', categorySchema);

