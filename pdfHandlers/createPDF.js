const {jsPDF} = require('jspdf');
const getExpense = require('./getExpense');
const moment = require('moment');
require('jspdf-autotable');

const createPDF = async(user) =>{

    const getFormattedDate = (date)=>{
        return moment(date).format('DD-MM-YYYY');
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    let monthIndex = new Date().getMonth();
    let monthName = monthNames[monthIndex];

    

    const doc = new jsPDF({
        orientation: "portrait", 
        unit: "pt", 
        format: "a4", 
      });

    doc.setFontSize(15);

    const title1 = "Expense-Tracker";
    const title2 = `${monthName} month's expenses`;

    const Xoffset1 = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(title1) * doc.internal.getFontSize() / 2);
    const Xoffset2 = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(title2) * doc.internal.getFontSize() / 2);

    const headers = [["SI No.", "Date", "Expense"]];
    let expensesData = [];

    let expenses = await getExpense(user);
    const calculateSum = (amount)=>{
        let sum = 0;
        for(let i=0;i<amount.length;i++) sum+=amount[i];
        return sum;
        }
    expenses = expenses.filter((expense)=>{
        return new Date(expense.date).getMonth() === monthIndex;
    });
    expensesData = expenses.map((expense, index)=>{
        return [index+1, getFormattedDate(expense.date), calculateSum(expense.expenses.amount)];
    });

    const content = {
        startY: 100,
        theme: 'grid',
        tableWidth: 'auto',
        columnWidth: 'auto',
        head: headers,
        headStyles: {
            fillColor: [49, 52, 66],
            textColor: [255,255,255],
            fontSize: 12,
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245],
            textColor: [0,0,0],
            fontSize: 12,
        },
        body: expensesData
    };

    doc.text(title1, Xoffset1, 40);
    doc.text(title2, Xoffset2, 70);

    doc.autoTable(content);

    const pdfOutput = doc.output("datauristring");

    return pdfOutput;

}

module.exports = createPDF;