module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    arabic_name: {
      type: Sequelize.STRING
    },
    english_name: {
      type: Sequelize.STRING
    },
    start_date: {
      type: Sequelize.DATE
    },
    duration: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.DOUBLE
    },
    custom_fields: {
      type: Sequelize.JSON
    },
    
  });

  return Product;
};
