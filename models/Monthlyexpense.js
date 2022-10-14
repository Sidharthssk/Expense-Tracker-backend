const mongoose = require('mongoose');
const Dailyexpense = require('./Dailyexpense');
const {Schema} = mongoose;

const MonthlySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: Date,
    monthlyExpense: [Dailyexpense]
});

module.exports = mongoose.model('monthlySchema', MonthlySchema);
