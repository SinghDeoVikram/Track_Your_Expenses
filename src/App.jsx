import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";
import { useState } from "react";
import { useLocationStorage } from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocationStorage("expense", {
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocationStorage("expenses", expenseData);
  const [editingRowId, setEditingRowId] = useLocationStorage(
    "editingRowId",
    ""
  );

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          setEditingRowId={setEditingRowId}
        />
      </div>
    </main>
  );
}

export default App;
