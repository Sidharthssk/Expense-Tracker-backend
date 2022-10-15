const mongoose = require('mongoose');

const {Schema} = mongoose;

const expenseSchema = new Schema({
    expense_tag : {
        type: [String],
        required: true
    },
    amount : {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('expense', expenseSchema);
