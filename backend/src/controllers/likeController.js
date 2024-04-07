const { Sequelize } = require("sequelize");
const { Like, User } = require("../models");
let self = {};

self.create = async (req, res) => {
  try {
    const { userId, like } = req.body;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const liked = await Like.create({
      userId,
      like,
    });

    res.status(200).json(liked);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create like");
  }
};

self.delete = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    await Like.destroy({
      where: {
        userId,
      },
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete like");
  }
};

module.exports = self;
