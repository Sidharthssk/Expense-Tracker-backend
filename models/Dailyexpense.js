const mongoose = require('mongoose');
const expense = require('./Expense').schema;

const {Schema} = mongoose;

const DailyexpenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    expenses : {
        type: expense,
        required: true
    }
});

module.exports = mongoose.model('dailyExpense',DailyexpenseSchema);
