const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const getUsers = require('./pdfHandlers/getUsers');
const sendEmail = require('./pdfHandlers/sendMail');
const Dailyexpense = require('./models/Dailyexpense');

connectToMongo();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())


// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/expense', require('./routes/dailyExpense'))

app.get('/', (req, res) => {

})

function getMillisUntillMonthEnd() {
  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
  const millisTillNextMonth = nextMonthDate - currentDate;
  return millisTillNextMonth;
}

let millisUntilMonthEnd = getMillisUntillMonthEnd();

const intervalFunc = async() => {
  const totalUsers = getUsers();
  const users = await totalUsers;
  users.forEach(async(user) => {
    await sendEmail(user);
    Dailyexpense.deleteMany({user: user._id}, (err, result) => {
      if(err){
        console.log(err);
      }
    });
    user.totalExpense = 0;
    await user.save();
  })
}

setInterval(intervalFunc, millisUntilMonthEnd);

app.listen(port, () => {
  console.log(`ExpenseTracker backend listening on port ${port}`)
})