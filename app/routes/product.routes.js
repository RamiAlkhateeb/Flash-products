module.exports = app => {
  const products = require("../controllers/product.controller.js");
  const { authJwt } = require("../middleware");

  var router = require("express").Router();

  // Create a new Product
  router.post("/",
  [authJwt.verifyToken],
  products.create);

  // Retrieve all products
  router.get("/", products.findAll);

  // Retrieve all products
  router.get("/categories", products.findAllCategories);

  // Retrieve all products according to languages
  // router.get("/ar", products.findAllArabic);
  // router.get("/en", products.findAllEnglish);


  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Update a Product with id
  router.put("/:id", products.update);

  // Delete a Product with id
  router.delete("/:id",
  [authJwt.verifyToken],
  products.delete);

  // Delete all products
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
