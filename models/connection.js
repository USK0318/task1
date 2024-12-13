const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URL;

async function run() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to DB');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}


run().catch(console.dir);

module.exports = mongoose;
