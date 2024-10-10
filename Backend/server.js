const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fundRoutes = require('./routes/fundRoutes');
const optionRoutes = require('./routes/optionRoutes');
const initiativeRoutes = require('./routes/initiative')
const bodyParser = require('body-parser');
const { auth } = require('./middleware/auth')
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path')
// const otpRoutes = require('./routes/otpRoutes');
const app = express();
const multer = require('multer')
require('dotenv').config();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use("/files", express.static("files"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use('/', authRoutes);
app.use('/', fundRoutes);
app.use('/', optionRoutes);
app.use('/', initiativeRoutes);
// app.use('/api', otpRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}filename`);
  },
})
const upload = multer({ storage });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

