const mongoose = require('mongoose');

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect('mongodb+srv://sidharthssk18:Captain2002@expense-tracker.jwqxgv5.mongodb.net/?retryWrites=true&w=majority');
  console.log("Connection successful");
}

module.exports = connectToMongo;