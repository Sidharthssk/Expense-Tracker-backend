const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const getUsers = require('./pdfHandlers/getUsers');
const sendEmail = require('./pdfHandlers/sendMail');

connectToMongo();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())

var corsOptions = {
    origin: ['http://localhost:3000', 'https://daily-expense-keeper.herokuapp.com'],
    optionsSuccessStatus: 200
}


// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/expense', require('./routes/dailyExpense'))

app.get('/', (req, res) => {

})

var date = new Date();
var millisTill11 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 0, 0, 0) - date;

if (millisTill11 < 0) {
    millisTill11 += 86400000;
}

setInterval(()=>{

  date = new Date();
  millisTill11 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 0,0,0) - date;

  if(millisTill11<0){
    millisTill11 += 86400000;
  }

  const oneDayInMs = 1000 * 60 * 60 * 24;

  if(new Date(date.getTime() + oneDayInMs).getDate() == 1){
    const totalUsers = getUsers();
    totalUsers.then((users) => {
      users.forEach((user) => {
          sendEmail(user);
      });
  });
  }

}, millisTill11);

app.listen(port, () => {
  console.log(`ExpenseTracker backend listening on port ${port}`)
})