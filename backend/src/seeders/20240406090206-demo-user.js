"use strict";
const axios = require("axios");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const res = await axios.get("https://dummyjson.com/users?limit=0");
      const data = res.data.users;
      const salt = bcrypt.genSaltSync(10);
      const userData = [];
      data.forEach(async (element) => {
        userData.push({
          firstName: element.firstName,
          lastName: element.lastName,
          email: element.email,
          age: element.age,
          gender: element.gender,
          image: element.image,
          university: element.university,
          password: bcrypt.hashSync(element.password, salt),
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
