const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailList: {
        type: [String],
    },
    expenseLimit: {
        type: Number,
        default: 2000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user',UserSchema);
