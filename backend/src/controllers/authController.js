const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

let self = {};

self.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(500).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(500).json({ error: "Authentication failed" });
    }
    const token = generateToken(user.id);
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
      decoded: jwt.verify(token, process.env.JWT_SECRET),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

self.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      university,
      password,
      email,
      interests,
    } = req.body;
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const user = await User.create({
      firstName,
      lastName,
      university,
      email,
      gender,
      interests,
      password: bcrypt.hashSync(password, salt),
    });

    return res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

module.exports = self;
