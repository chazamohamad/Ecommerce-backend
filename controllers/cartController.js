const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET USER CART

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    }).populate(
      "products.productId",
      "title price image quantityInStock salePercentage",
    );

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

    // get product

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // CHECK STOCK

    if (product.quantityInStock < quantity) {
      return res.status(400).json({
        message: "Not enough stock",
      });
    }

    let cart = await Cart.findOne({
      userId,
    });

    // if no cart create one

    if (!cart) {
      cart = new Cart({
        userId,

        products: [],
      });
    }

    // check if product already exists

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;

      // CHECK AGAIN

      if (product.quantityInStock < newQuantity) {
        return res.status(400).json({
          message: "Not enough stock",
        });
      }

      existingProduct.quantity = newQuantity;
    } else {
      cart.products.push({
        productId,

        quantity,
      });
    }

    await cart.save();

    res.status(201).json(cart);
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

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const cartProduct = cart.products.find(
      (item) => item.productId.toString() === req.params.productId,
    );

    if (!cartProduct) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    // GET PRODUCT STOCK

    const productData = await Product.findById(req.params.productId);

    if (!productData) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // CHECK STOCK

    if (quantity > productData.quantityInStock) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    // UPDATE QUANTITY

    cartProduct.quantity = quantity;

    // RECALCULATE TOTAL PRICE

    let total = 0;

    for (const item of cart.products) {
      const product = await Product.findById(item.productId);

      const finalPrice =
        product.salePercentage > 0
          ? product.price - (product.price * product.salePercentage) / 100
          : product.price;

      total += finalPrice * item.quantity;
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
