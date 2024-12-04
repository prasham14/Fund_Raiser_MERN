const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fundRoutes = require('./routes/fundRoutes');
const optionRoutes = require('./routes/optionRoutes');
const userDetailsRoutes = require('./routes/userDetails')
const initiativeRoutes = require('./routes/initiative')
const paymentRoutes = require('./routes/payment');
const docRoutes = require('./routes/docRoutes')
const bodyParser = require('body-parser');
const { jwtAuthMiddleware } = require('./jwt')
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path')
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use("/files", express.static("files"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use('/', authRoutes);
app.use('/', jwtAuthMiddleware, fundRoutes);
app.use('/', optionRoutes);
app.use('/', jwtAuthMiddleware, initiativeRoutes);
app.use('/', jwtAuthMiddleware, docRoutes);
app.use('/', jwtAuthMiddleware, userDetailsRoutes);
app.use('/', jwtAuthMiddleware, paymentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

