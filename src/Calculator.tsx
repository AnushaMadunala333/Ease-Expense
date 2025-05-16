import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type TransactionHistory = {
  type: string;
  category: string;
  amount: number;
  date: string;
};

export default function Calculator() {
  const [budget, setbudget] = useState('');
  const [description, setdescription] = useState(0);
  const [category, setCategory] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [changeIncomeAmount, setChangeIncomeAmount] = useState('');
  const [ExpenseAmount, setExpenseAmount] = useState(0);
  const [changeExpenseAmount, setChangeExpenseAmount] = useState('');
  const [incomeHistory, setIncomeHistory] = useState<TransactionHistory[]>([]);
  const [expenseHistory, setExpenseHistory] = useState<TransactionHistory[]>([]);

  const COLORS = ['#00C49F', '#FF8042'];

  const data = [
    { name: 'Income', value: incomeAmount },
    { name: 'Expenses', value: ExpenseAmount },
  ];

  const isEmpty = incomeAmount === 0 && ExpenseAmount === 0;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleIncomeAmountChange = (e) => {
    setChangeIncomeAmount(e.target.value);
  };

  const handleExpenseAmountChange = (e) => {
    setChangeExpenseAmount(e.target.value);
  };

  const handleAddIncomeClick = () => {
    const newIncome = Number(changeIncomeAmount);
    const transactionHistory = {
      type: 'Income',
      category,
      amount: newIncome,
      date: startDate.toLocaleDateString(),
    };
    setIncomeAmount((prev) => prev + newIncome);
    setIncomeHistory((prev) => [...prev, transactionHistory]);
    setChangeIncomeAmount('');
  };

  const handleAddExpenseClick = () => {
    const newExpense = Number(changeExpenseAmount);
    const transactionHistory = {
      type: 'Expense',
      category: expenseCategory,
      amount: newExpense,
      date: startDate.toLocaleDateString(),
    };
    setExpenseAmount((prev) => prev + newExpense);
    setExpenseHistory((prev) => [...prev, transactionHistory]);
    setChangeExpenseAmount('');
  };

  const handleInputBudget = (e) => {
    setbudget(e.target.value);
  };

  const handleSaveButtonClick = () => {
    setdescription(Number(budget));
  };

  return (
    <>
      <div className="brand_name">Ease Expense</div>
      <div className="dashboard">Dashboard</div>
      <div className="container">
        <div className="budget_container">
          <span className="budget_title">Budget</span>
          <span className="budget_amount">$ {description}</span>
          <span className="budget_description">Your defined budget amount</span>
        </div>
        <div className="budget_container">
          <span className="budget_title">Income</span>
          <span className="budget_amount">$ {incomeAmount}</span>
          <span className="budget_description">Total income recorded</span>
        </div>
        <div className="budget_container">
          <span className="budget_title">Expenses</span>
          <span className="budget_amount">$ {ExpenseAmount}</span>
          <span className="budget_description">Total expenses recorded</span>
        </div>

        <div className="setbudget_container">
          <span className="budget_title">Set Budget</span>
          <span className="budget_description">Define your total budget for the period</span>
          <span className="setbudget_title">
            Budget Amount ($)
            <input type="number" placeholder="$" className="budget_input" onChange={handleInputBudget} />
            <button className="save_budget" onClick={handleSaveButtonClick}>Save Budget</button>
          </span>
        </div>
      </div>

      <div className="incomeexpense_container">
        <div className="income_container">
          <span className="budget_title">Add Income</span>
          <span className="budget_description">Record your Income</span>
          <span className="budget_amount">Amount ($)</span>
          <input className="budget_input" type="number" placeholder="$ Enter Amount" onChange={handleIncomeAmountChange} />
          <span className="budget_amount">Category</span>
          <select className="category_input" value={category} onChange={handleCategoryChange}>
            <option value="">-- select an option --</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investments">Investments</option>
            <option value="Others">Others</option>
          </select>
          <span className="budget_amount">Date</span>
          <div className="datepicker">
            <DatePicker
              selected={startDate}
              onChange={(date) => date ? setStartDate(date) : ''}
            />
          </div>
          <button className="save_budget" onClick={handleAddIncomeClick}>
            Add Income
          </button>
        </div>

        <div className="income_container">
          <span className="budget_title">Add Expense</span>
          <span className="budget_description">Record your Expenses</span>
          <span className="budget_amount">Amount ($)</span>
          <input className="budget_input" type="number" placeholder="$ Enter Amount" onChange={handleExpenseAmountChange} />
          <span className="budget_amount">Category</span>
          <select className="category_input" value={expenseCategory} onChange={handleExpenseCategoryChange}>
            <option value="">-- select an option --</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="HealthCare">HealthCare</option>
            <option value="Other Expenses">Other Expenses</option>
          </select>
          <span className="budget_amount">Date</span>
          <div className="datepicker">
            <DatePicker
              selected={startDate}
              onChange={(date) => date ? setStartDate(date) : ''}
            />
          </div>
          <button className="save_budget" onClick={handleAddExpenseClick}>
            Add Expense
          </button>
        </div>

        {!isEmpty && (
          <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="transaction_history">
        <h3 className="history_title">Transaction History</h3>
        <table className="transaction_table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[...incomeHistory, ...expenseHistory].map((item, index) => (
              <tr key={index}>
                <td className="fill_details">{item.type}</td>
                <td className="fill_details">{item.category}</td>
                <td className="fill_details">{item.amount}</td>
                <td className="fill_details">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
