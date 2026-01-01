import { useEffect, useState } from "react";
import api from "../api/axios";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch(() => alert("Failed to fetch transactions"));
  }, []);

  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryData = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h3>Total Income</h3>
          <p>₹{totalIncome.toFixed(2)}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h3>Balance</h3>
          <p>₹{(totalIncome - totalExpenses).toFixed(2)}</p>
        </div>
      </div>

      {transactions.length === 0 && <p>No transactions</p>}
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.slice(0, 10).map((t) => (
          <li key={t.id}>
            {t.type} - ₹{t.amount} ({t.category}) - {t.description} - {new Date(t.date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      {pieData.length > 0 && (
        <div>
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
