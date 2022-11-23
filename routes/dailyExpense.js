const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const Dailyexpense = require('../models/Dailyexpense');
const router = express.Router();
const Expense = require('../models/Expense');
const moment = require('moment');
const User = require('../models/User');

const calcTotal = (amount) =>{
    let total = 0;
    for(let i=0;i<amount.length;i++){
        total += parseInt(amount[i]);
    }
    return total;
}

router.post('/dailyexpense', fetchuser,
async (req, res) =>{

    if(req.body.expense_tag.length !== req.body.amount.length){
        return res.status(400).json({error: "Enter amount for all the field"})
    }

    try{

        let {expense_tag, amount} = req.body;
        console.log(amount);

        let expense = await Dailyexpense.findOne({addedOn: moment().format('DD-MM-YYYY'),user: req.user.id});
        let user = await User.findById(req.user.id);
        if(expense && user){
            expense.expenses.expense_tag = expense.expenses.expense_tag.concat(expense_tag);
            expense.expenses.amount = expense.expenses.amount.concat(amount);
            user.totalExpense = user.totalExpense + calcTotal(amount);
            expense = await expense.save();
            user = await user.save();
            return res.json({id: expense._id, expense});
        }
    
        let expenseObj = new Expense({
            expense_tag: expense_tag,
            amount: amount
        });

        const dailyExpenseObj = new Dailyexpense({
            user: req.user.id,
            expenses: expenseObj
        });
        const savedExpense = await dailyExpenseObj.save()
        user.totalExpense = user.totalExpense + calcTotal(amount);
        user = await user.save();
    
        res.json(savedExpense);
    }
    catch(errors){
        console.log(errors)
        res.status(500).send("Internal server error occured")
    }
})

router.post('/editExpense/:id',fetchuser,
async (req, res)=>{
    let {expense_tag, amount} = req.body;

    const newExpenseObj = new Expense({
        expense_tag: expense_tag,
        amount: amount
    });

    let dailyexpenseObj = await Dailyexpense.findById(req.params.id);

    if(!dailyexpenseObj){
        return res.status(400).send("Not found");
    }

    if(dailyexpenseObj.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }

    dailyexpenseObj = await Dailyexpense.findByIdAndUpdate(req.params.id, {expenses: newExpenseObj}, {new: true});
    res.json({dailyexpenseObj});
});

router.get('/fetchdailyexpense', fetchuser, async(req, res)=>{
    try{
        const dailyexpenses = await Dailyexpense.find({user: req.user.id});
        res.json(dailyexpenses);
    }
    catch(errors){
        res.status(500).send(errors);
    }
})

module.exports = router;
