const express = require("express");
const { body, validationResult } = require("express-validator");
const { registerUser, login } = require("../controller/authController");
const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("role")
      .optional()
      .isIn(["Admin", "Manager", "SalesExecutive"])
      .withMessage("Role must be either admin or user"),
  ],

  async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;
    
    const responce = await registerUser(username, email, password, role)
    console.log(responce)
    res.status(200).json({message: "User registered successfully",
      data: {username,email,role:responce.role},
    });
  }
);



// Login User 


authRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Handle validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("Login Request:", email, password);

    try {
      const response = await login(email, password);

      if (!response || response.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }

      if (response.message === "Invalid password") {
        return res.status(401).json({ message: "Invalid password" });
      }

      console.log("User logged in successfully:", response);

      res.status(200).json({
        message: response.message,
        data: {
          username: response.username,
          email: response.email,
          role: response.role,
        },
        token : response.token
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  }
);

module.exports = { authRouter };
