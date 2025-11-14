const { Model } = require('sequelize');
const User = require('../module/user');
const { hashPassword } = require('../service/hashPassword');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(username, email, password, role) {

    const hashedpassword = await hashPassword(password);
  
  try {
    const response = await User.create({ username, email, password:hashedpassword, role });
    console.log("User registered");
    return response.dataValues;
  } catch (error) {
    console.error("Error registering user:", error);
    return error;
  }
}


// Login controller

async function login(email, password) {
  try {
    console.log("Searching for user...");

    // ✅ Correct Sequelize syntax — use `where` inside findOne
    const loguser = await User.findOne({ where: { email } });

    if (!loguser) {
      console.log("User not found");
      return { success: false, message: "User not found" };
    }

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, loguser.password);

    if (!isMatch) {
      console.log("Invalid password");
      return { success: false, message: "Invalid password" };
    }


const token = jwt.sign(
      {
        user_id: loguser.user_id,
        username: loguser.username,
        email: loguser.email,
        role: loguser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.log("user id is",loguser.user_id)
    return {
      message: "Login successful",
      user_id :loguser.user_id,
      username: loguser.username,
      email: loguser.email,
      role: loguser.role,
      token, 
    };

  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Internal server error" };
  }
}



module.exports = {registerUser,login}