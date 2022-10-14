const mongoose = require('mongoose');
const expense = require('./expense');

const {Schema} = mongoose;

const DailyexpenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: Date,
    expenses : [expense]
});

module.exports = mongoose.model('dailyExpense',DailyexpenseSchema);
