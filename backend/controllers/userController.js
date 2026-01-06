const User = require('../models/User');
const { sendTokenResponse } = require('../utils/tokenUtils');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    // Send token response
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/users/password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Add address
// @route   POST /api/users/addresses
// @access  Private
exports.addAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // If this is set as default, unset others
    if (req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(req.body);
    await user.save();

    res.status(201).json({
      status: 'success',
      data: user.addresses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:addressId
// @access  Private
exports.updateAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        status: 'error',
        message: 'Address not found'
      });
    }

    // If this is set as default, unset others
    if (req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    Object.assign(address, req.body);
    await user.save();

    res.status(200).json({
      status: 'success',
      data: user.addresses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private
exports.deleteAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.addresses.pull(req.params.addressId);
    await user.save();

    res.status(200).json({
      status: 'success',
      data: user.addresses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
exports.addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Product already in wishlist'
      });
    }

    user.wishlist.push(req.params.productId);
    await user.save();

    res.status(200).json({
      status: 'success',
      data: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist.pull(req.params.productId);
    await user.save();

    res.status(200).json({
      status: 'success',
      data: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get wishlist
// @route   GET /api/users/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');

    res.status(200).json({
      status: 'success',
      data: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

