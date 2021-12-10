module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  

    // Retrieve all products
    router.get("/", products.findAllCategories);
  

    // Retrieve a single Category with id
    router.get("/:id/products", products.findCategoryById);
  
    // Delete a Category with id
    router.delete("/:id", products.deleteCategory);
  
    app.use("/api/categories", router);
  };
  