const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const Dailyexpense = require('../models/Dailyexpense');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/dailyexpense', fetchuser,
async (req, res) =>{

    if(req.body.expense_tag.length !== req.body.amount.length){
        return res.status(400).json({error: "Enter amount for all the field"})
    }

    try{

        let {expense_tag, amount} = req.body;
    
        let expenseObj = new Expense({
            expense_tag: expense_tag,
            amount: amount
        });

        const dailyExpenseObj = new Dailyexpense({
            user: req.user.id,
            expenses: expenseObj
        });
        const savedExpense = await dailyExpenseObj.save()
    
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
})

module.exports = router;