const mongoose = require('mongoose');
const expense = require('./Expense').schema;
const moment = require('moment');

const {Schema} = mongoose;

const DailyexpenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    expenses : {
        type: expense,
        required: true
    },
    addedOn: {
        type: String,
        default: moment().format('DD-MM-YYYY')
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('dailyExpense',DailyexpenseSchema);
