const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const js = process.env.JWT_SECRET;
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
async function signup(req, res) {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");
    const payload = { id: response.id };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Prevents JavaScript from accessing cookies  
      sameSite: 'Lax' // Adjust based on your needs  
    };
    res.cookie('cookies', token, options);
    const userData = {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
      message: "logged in successfully"
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
}

const signOut = async (req, res) => {
  res.clearCookie('cookies');

  return res.json({
    success: true,
    message: 'loggedOut Successfully'
  })
}

async function editProfile(req, res) {
  const { username } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { username },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Username updated', response: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

async function profile(req, res) {
  try {
    const { email } = req.params;
    console.log(email);
    const response = await User.findOne({ User });
    console.log(response);
    return res.json({
      success: true,
      message: "success",
      response: response
    })
  }
  catch (error) {
    return res.json({
      message: "error occured"
    })
  }
}

module.exports = {
  signup, login, profile, editProfile, signOut
};