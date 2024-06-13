const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
require('dotenv').config();

const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
