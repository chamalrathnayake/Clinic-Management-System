"use client";
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FinancialRecordsPage = () => {
  // Static data for the bar chart and pie chart
  const [monthlyData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Income",
        data: [4000, 5000, 6000, 7000, 8000, 9000],
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Black
      },
      {
        label: "Expenses",
        data: [2000, 3000, 4000, 5000, 6000, 7000],
        backgroundColor: "rgba(128, 128, 128, 0.6)", // Gray
      },
    ],
  });

  const [pieData] = useState({
    labels: ["Drugs", "Operations", "Payments", ""],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: [
          "rgba(0, 0, 0, 0.6)", // Black
          "rgba(128, 128, 128, 0.6)", // Dark Gray
          "rgba(169, 169, 169, 0.6)", // Gray
          "rgba(211, 211, 211, 0.6)", // Light Gray
        ],
      },
    ],
  });

  const [transactions] = useState([
    { id: 1, date: "2024-10-01", description: "Payments", amount: 50000 },
    { id: 2, date: "2024-10-05", description: "Charges", amount: 15000 },
    { id: 3, date: "2024-10-10", description: "Drugs", amount: 30000 },
    { id: 4, date: "2024-10-15", description: "Salaries", amount: 20000 },
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Financial Records</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Monthly Overview</h2>
          <Bar data={monthlyData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Expense Breakdown</h2>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Total Income</h2>
          <p className="text-3xl font-bold">LKR.500,000.00</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded shadow p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Date</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Amount (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {transaction.description}
                </td>
                <td className="px-4 py-2 border-b">LKR.{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-600"
      >
        Print Financial Records
      </button>
    </div>
  );
};

export default FinancialRecordsPage;
