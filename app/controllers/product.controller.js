const db = require("../models");
const Product = db.products;
const Category = db.categories;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.arabic_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    arabic_name: req.body.arabic_name,
    english_name: req.body.english_name,
    start_date : req.body.start_date ? req.body.start_date : Date.now(),
    duration : req.body.duration,
    price : req.body.price,
    custom_fields : req.body.custom_fields,
    categoryId: req.body.categoryId
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const lang = req.query.lang;
  //var attributes;
  var columns 
  if(lang == 'ar')
  {
    columns = "id,arabic_name, start_date, duration,price,custom_fields"
    //attributes = ['id','arabicName', 'start_date', 'duration','price','custom_fields']
  }else if(lang == 'en'){
    columns = "id,english_name, start_date, duration,price,custom_fields"
  }else{
    columns = "*"
  }

  const query = db.sequelize.query("select "+columns+" from products where CURRENT_DATE - start_date::DATE <= duration and CURRENT_DATE > start_date::DATE"
  , { type: QueryTypes.SELECT })
  .then(data => {
    res.send(data)
  })

  // Product.findAll({ attributes: attributes , where :  {
  //  start_date : {[Op.gt]: newDate} 
  // }})
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving products."
  //     });
  //   });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// find all Product in Arabic
// exports.findAllArabic = (req, res) => {
//   Product.findAll({ attributes: ['arabicName', 'start_Date', 'duration','price','custom_fields'] })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving products."
//       });
//     });
// };


// Get the Category for a given id
exports.findCategoryById = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id, { include: ["products"] })
    .then((category) => {
      if(category){
        res.send(category);
      } else {
        res.status(404).send({
          message : `Cannot find Category with id=${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};

// Get all products include products
exports.findAllCategories = (req, res) => {
  Category.findAll({
    include: ["products"],
  }).then((categories) => {
    res.send(categories);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving categories."
    });
  });
};

// Delete a Category with the specified id in the request
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};