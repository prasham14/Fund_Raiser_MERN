const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const { auth } = require('./middleware/auth')
const cors = require('cors');
const cookieparser = require('cookie-parser');
// const otpRoutes = require('./routes/otpRoutes');
const app = express();
const multer = require('multer')
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());

app.use('/', authRoutes);
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

