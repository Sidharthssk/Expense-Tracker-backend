const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  
  await mongoose.connect(process.env.DB_LINK);
}

module.exports = connectToMongo;