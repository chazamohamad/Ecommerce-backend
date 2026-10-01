const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    // CHECK STOCK FIRST

    for (const item of req.body.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.quantityInStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.title}`,
        });
      }
    }

    // CREATE ORDER FIRST
    const orderNumber = "ORD-" + Date.now();
    const order = new Order({
      orderNumber,
      userId: req.body.userId,

      products: req.body.products.map((item) => ({
        productId: item.productId,

        quantity: item.quantity,

        price: item.price,
      })),

      totalPrice: req.body.totalPrice,

      deliveryInfo: req.body.deliveryInfo,

      paymentMethod: req.body.paymentMethod,
    });

    const savedOrder = await order.save();

    // DECREASE STOCK AFTER SUCCESS

    for (const item of req.body.products) {
      await Product.findByIdAndUpdate(
        item.productId,

        {
          $inc: {
            quantityInStock: -item.quantity,
          },
        },
      );
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)

const getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1; //1

    const limit = Number(req.query.limit) || 10; //5

    const search = req.query.search || ""; //chaza

    const status = req.query.status || ""; //-

    const skip = (page - 1) * limit; //0

    // Find users matching search

    const users = await User.find({
      $or: [
        //يعني:أي شرط من الاثنين يكفي.
        {
          FullName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          Email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).select("_id"); //يعني:لاأريد كل بيانات المستخدم.
    // _id:أريد فقط
    //return=>users=[{112},{114}],array of objects of ids
    const userIds = users.map((user) => user._id); //return=>userIds=[112,114],array of ids

    const filter = {};

    // SEARCH FILTER

    if (search) {
      filter.$or = [
        {
          orderNumber: {
            $regex: search,
            $options: "i",
          },
        },

        {
          userId: {
            $in: userIds, //أعطني الطلبات التي صاحبها واحد من هؤلاء المستخدمين.
          },
        },
      ];
    }

    // STATUS FILTER

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)

      .populate("userId", "FullName Email")

      .skip(skip)

      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);

    res.json({
      orders,

      currentPage: page,

      totalPages: Math.ceil(totalOrders / limit),

      totalOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ORDERS BY USER ID

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    })

      .populate("products.productId", "title price image");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET ORDER BY ID

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

      // get user information

      .populate("userId", "FullName Email")

      // get product details including image

      .populate("products.productId", "title price image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ORDER STATUS BY ORDER NUMBER

const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      orderNumber: order.orderNumber,

      status: order.status,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true, // Return the updated document
      },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ORDER

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,

  getAllOrders,

  getUserOrders,

  getOrderById,

  getOrderStatus,

  updateOrderStatus,

  deleteOrder,
};
