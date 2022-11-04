const expense = require('../models/Dailyexpense');

const getExpense = async (user) => {
    
    try{
        const expenses = await expense.find({user});
        return expenses;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = getExpense