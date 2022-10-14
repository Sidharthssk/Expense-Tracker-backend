const mongoose = require('mongoose');

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect('mongodb://localhost:27017/expenseTracker?directConnection=true');
  console.log("Connection successful");
}

module.exports = connectToMongo;