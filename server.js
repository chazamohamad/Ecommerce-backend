const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// Swagger

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Ecommerce API",
      version: "1.0.0",
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares

app.use(cors());

app.use(express.json());

// MongoDB

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((error) => {
    console.log(error);
  });

// Test route

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
