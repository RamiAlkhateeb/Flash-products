'use strict'
var bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    var date = new Date()
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'rami13alkhateeb',
          email: 'rami13alkhateeb@gmail.com',
          password: bcrypt.hashSync("123456", 8),
          createdAt: date,
          updatedAt: date,
        },
        {
          username: 'testuser',
          email: 'testuser@gmail.com',
          password: bcrypt.hashSync("test", 8),
          createdAt: date,
          updatedAt: date,
        },
      ],
      {},
      'categories',
      [
        {
          name : "cars",
          createdAt: date,
          updatedAt: date,
        },
        {
          name : "laptops",
          createdAt: date,
          updatedAt: date,
        },
        {
          name : "mobiles",
          createdAt: date,
          updatedAt: date,
        }
      ],

    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
