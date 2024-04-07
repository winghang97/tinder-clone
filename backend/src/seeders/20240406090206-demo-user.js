"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const res = await axios.get("https://dummyjson.com/users?limit=0");
      const data = res.data.users;
      console.log(data.length);
      const userData = [];
      data.forEach(async (element) => {
        userData.push({
          firstName: element.firstName,
          lastName: element.lastName,
          age: element.age,
          gender: element.gender,
          image: element.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      await queryInterface.bulkInsert("Users", userData, {});
    } catch (error) {
      console.error(error);
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
