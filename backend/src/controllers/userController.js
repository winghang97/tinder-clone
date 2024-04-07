const { Sequelize, Op } = require("sequelize");
const { User, Like } = require("../models");
let self = {};

self.getAll = async (req, res) => {
  try {
    const { gender } = req.query;
    let whereClause = {};
    if (gender) {
      whereClause.gender = gender;
    }
    const like = await Like.findAll({ attributes: ["userId"] });
    console.log(like);
    const usersInLike = like.map((like) => like.userId);

    const users = await User.findAll({
      where: {
        id: {
          [Op.notIn]: usersInLike,
        },
      },
      order: Sequelize.literal("RANDOM()"),
      limit: 10,
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Fail to get users");
  }
};

module.exports = self;
