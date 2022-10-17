const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 8000

app.use(express.json());
app.use(cors())



// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/dailyExpense'))

app.get('/', (req, res) => {

})

app.listen(port, () => {
  console.log(`ExpenseTracker backend listening on port ${port}`)
})