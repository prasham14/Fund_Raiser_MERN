const User = require('../models/User');
const nodemailer = require('nodemailer');
const { generateToken } = require("./../jwt");

async function signup(req, res) {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");
    const payload = { id: response.id };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    return res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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
  try {
    const id = req.params.userId;
    console.log(id);
    const updatedData = req.body;
    const response = await User.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, //returns updated document
        runValidators: true, // for validations in mongoose , it checks the schema in which what is required
      }
    );
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

async function profile(req, res) {
  try {
    const { email } = req.params;
    console.log(email);
    const response = await User.findOne({ email });
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

async function emailVerify(req, res) {
  const { email, otp } = req.params;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Compose the email message
  const mailOptions = {
    from: process.env.STMP_USER,
    to: email,
    subject: 'Confirmation Email',
    text: 'Testing mail',
    html: `<p>Thank you for registering! here is your otp:<br/> <b>${otp}</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        success: true,
        message: "error is there"
      });
    } else {
      console.log('Email sent:', info.response);
      return res.json({
        success: true,
        message: "confirmation mail sent successfully"
      })
    }
  });
}

async function editEmail(req, res) {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const user = await User.findOneAndUpdate({ email: email }, updatedData, { new: true });
    if (user) {
      res.json({ message: 'User updated successfully', response: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

module.exports = {
  signup, login, profile, editProfile, signOut, editEmail, emailVerify
};