const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  getAllUsers
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.get('/users', getAllUsers);

module.exports = router;
