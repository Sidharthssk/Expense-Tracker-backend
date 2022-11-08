const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const getExpense = require('./pdfHandlers/getExpense');
const getUsers = require('./pdfHandlers/getUsers');
const sendEmail = require('./pdfHandlers/sendMail');

connectToMongo();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())


// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/dailyExpense'))

app.get('/', (req, res) => {

})

setInterval(()=>{

  var date = new Date;
  var oneDayInMs = 1000*60*60*24;

  const totalUsers = getUsers();
    totalUsers.then((users) => {
      users.forEach((user) => {
          sendEmail(user);
      });
  });

  // if(new Date(date.getTime() + oneDayInMs).getDate() == 1){
    
  // }

}, 5000);

app.listen(port, () => {
  console.log(`ExpenseTracker backend listening on port ${port}`)
})