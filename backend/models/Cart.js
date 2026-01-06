const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      price: {
        type: Number,
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }],
    totals: {
      subtotal: {
        type: Number,
        default: 0
      },
      itemCount: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totals.itemCount = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totals.subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  next();
});

// Indexes
cartSchema.index({ user: 1 });

module.exports = mongoose.model('Cart', cartSchema);

