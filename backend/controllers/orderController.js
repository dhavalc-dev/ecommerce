const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      pricing
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No order items provided'
      });
    }

    // Verify stock availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: `Product ${item.product} not found`
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          status: 'error',
          message: `Insufficient stock for ${product.name}`
        });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      pricing
    });

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], totals: { subtotal: 0, itemCount: 0 } }
    );

    res.status(201).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort('-createdAt')
      .populate('items.product', 'name images');

    res.status(200).json({
      status: 'success',
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Make sure user is order owner or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Make sure user is order owner
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to cancel this order'
      });
    }

    // Can only cancel pending or confirmed orders
    if (!['Pending', 'Confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({
        status: 'error',
        message: `Cannot cancel order with status: ${order.orderStatus}`
      });
    }

    order.orderStatus = 'Cancelled';
    order.cancelReason = req.body.reason;
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    next(error);
  }
};
