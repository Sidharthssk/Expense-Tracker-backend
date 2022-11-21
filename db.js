const mongoose = require('mongoose');

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect('mongodb+srv://sidharth:sidharth123@cluster0.tb0gifo.mongodb.net/?retryWrites=true&w=majority');
  console.log("Connection successful");
}

module.exports = connectToMongo;