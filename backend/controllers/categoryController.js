const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('subcategories')
      .sort('order');

    res.status(200).json({
      status: 'success',
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('subcategories');

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    category.isActive = false;
    await category.save();

    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
