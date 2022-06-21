var incomes = [];
var expenses = [];

var incomeTypes = ['Salary', 'Freelance Payouts', 'Others'];
var expenseTypes = ['Food', 'Health', 'Home', 'Education', 'Entertainment', 'Others' ];
for ( var i = 0; i < 100; i++) {
  var incomeDoc = {
    description: `Income Test # ${(i + 1)}.`,
    date: new Date().toISOString(),
    created: new Date().toISOString(),
    type:'INCOME',
    category: incomeTypes[Math.floor(Math.random()*3)],
    amount: Math.round(Math.random() * 100000)/100
  };
  incomes.push(incomeDoc);
}
for (var i = 0; i < 100; i++) {
  var expenseDoc = {
    description: `Expense Test # ${(i + 1)}.`,
    date: new Date().toISOString(),
    created: new Date().toISOString(),
    type: 'EXPENSE',
    category: expenseTypes[Math.floor(Math.random() * 5)],
    amount: Math.round(Math.random() * 100000) / 100
  };
  expenses.push(expenseDoc);
}
db.cashFlow.insert(incomes);
db.cashFlow.insert(expenses);
