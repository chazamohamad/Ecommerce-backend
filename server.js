const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); //bye2ra .env file

const app = express();

app.use(cors()); //yeeni smeh lal frontend yettesel
app.use(express.json()); //bikhalle express yefham json formats

mongoose
  .connect(process.env.MONGO_URI) //ya mongoose tesel bl database(mongodb)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000; //eza fi port b .env staamlu eza lae 5000
require("./models/category");
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //teshghil server w t3ayet lal port
});
