const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

dotenv.config({path: './config.env'});

const {PORT, NODE_ENV, MONGO_URI} = process.env;

const app = express();
app.use(express.json());
app.use(cors());

const otpRoutes = require('./routes/otp');
app.use('/api/v1/otp', otpRoutes);

const meRoutes = require('./routes/me');
app.use('/api/v1/me', meRoutes);


(async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Connection established to MongoDB host ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log(`Server started and ready to listen for requests at port ${PORT}`);
    });
  } catch (e) {
    console.log("Failed to connect to the database");
    console.log(e.message);
  }
})();


