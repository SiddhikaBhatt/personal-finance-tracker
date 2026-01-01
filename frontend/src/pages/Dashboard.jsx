import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch(() => alert("Failed to fetch transactions"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {transactions.length === 0 && <p>No transactions</p>}
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} - ₹{t.amount} ({t.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
