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

module.exports = router;
