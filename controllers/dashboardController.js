const Product = require("../models/Product");
const Order = require("../models/Order");

// GET DASHBOARD STATISTICS

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    const completedOrders = await Order.countDocuments({
      status: "completed",
    });

    const onDeliveryOrders = await Order.countDocuments({
      status: "ondelivery",
    });

    res.json({
      totalProducts,

      totalOrders,

      pendingOrders,

      completedOrders,

      onDeliveryOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
