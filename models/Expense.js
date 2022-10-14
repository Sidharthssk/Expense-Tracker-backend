const mongoose = require('mongoose');

const {Schema} = mongoose;

const expenseSchema = new Schema({
    expense_tag : String,
    amount : Number
});

module.exports = mongoose.model('expense', expenseSchema);
