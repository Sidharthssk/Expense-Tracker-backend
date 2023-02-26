const mongoose = require('mongoose');
const Dailyexpense = require('./Dailyexpense');
const {Schema} = mongoose;

const MonthlySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    month: String,
    total: Number,
});

module.exports = mongoose.model('monthlySchema', MonthlySchema);
