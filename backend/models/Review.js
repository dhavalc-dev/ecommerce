const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    helpful: {
      count: {
        type: Number,
        default: 0
      },
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },
    isApproved: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index to prevent duplicate reviews from same user for same product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Update product ratings when review is saved
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Product = mongoose.model('Product');
  
  const stats = await Review.aggregate([
    { $match: { product: this.product, isApproved: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': Math.round(stats[0].averageRating * 10) / 10,
      'ratings.count': stats[0].count
    });
  }
});

// Update product ratings when review is removed
reviewSchema.post('remove', async function() {
  const Review = this.constructor;
  const Product = mongoose.model('Product');
  
  const stats = await Review.aggregate([
    { $match: { product: this.product, isApproved: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': Math.round(stats[0].averageRating * 10) / 10,
      'ratings.count': stats[0].count
    });
  } else {
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': 0,
      'ratings.count': 0
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);

