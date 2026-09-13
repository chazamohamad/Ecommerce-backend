const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET USER CART

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    }).populate("products.productId", "title price image");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD PRODUCT TO CART

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // check product exists

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      userId: userId,
    });

    // create cart if doesn't exist

    if (!cart) {
      cart = new Cart({
        userId: userId,

        products: [],

        totalPrice: 0,
      });
    }

    // check if product already exists

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({
        productId: productId,

        quantity: quantity || 1,
      });
    }

    // calculate total price

    let total = 0;

    for (const item of cart.products) {
      const product = await Product.findById(item.productId);

      total += product.price * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE QUANTITY

const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    const product = cart.products.find(
      (item) => item.productId.toString() === req.params.productId,
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    product.quantity = quantity;

    // recalculate total price

    let total = 0;

    for (const item of cart.products) {
      const productData = await Product.findById(item.productId);

      total += productData.price * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE PRODUCT FROM CART

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== req.params.productId,
    );
    let total = 0;

    for (const item of cart.products) {
      const productData = await Product.findById(item.productId);

      total += productData.price * item.quantity;
    }

    cart.totalPrice = total;
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CLEAR CART

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    cart.products = [];

    cart.totalPrice = 0;

    await cart.save();

    res.json({
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,

  addToCart,

  updateQuantity,

  removeFromCart,

  clearCart,
};
