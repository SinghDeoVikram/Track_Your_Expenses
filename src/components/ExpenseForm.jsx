import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Title is Required!" },
      { minLength: 2, message: "Title should be at least 2 characters long" },
    ],
    category: [{ required: true, message: "category is Required!" }],
    amount: [
      {
        required: true,
        message: "amount is Required!",
      },
      {
        pattern: /^[1-9]\d*(\.\d+)?$/,
        message: "Please enter a valid Amount",
      },
    ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).map(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 2) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    // if (!formData.title) {
    //   errorsData.title = "Title is Required!";
    // }
    // if (!formData.category) {
    //   errorsData.category = "Category is Required!";
    // }
    // if (!formData.amount) {
    //   errorsData.amount = "Amount is Required!";
    // }

    setErrors(errorsData);
    return errorsData;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errResult = validate(expense);
    if (Object.keys(errResult).length) {
      return;
    }

    if (editingRowId) {
      setExpenses((prevState) => {
        return prevState.map((singleExpense) => {
          if (singleExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return singleExpense;
        });
      });
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    //setExpenses((prevState) => [...prevState, getFormData(e.target)]);
    //e.target.reset();
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const changeHandler = (e) => {
    setExpense((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErrors({});
  };

  // const getFormData = (form) => {
  //   const formData = new FormData(form);
  //   const data = {
  //     id: crypto.randomUUID(),
  //   };
  //   for (const [key, value] of formData.entries()) {
  //     data[key] = value;
  //   }
  //   return data;
  // };

  //const clickMe = useRef(0);
  return (
    <>
      {/* <h2>{clickMe.current}</h2>
      <button
        onClick={() => {
          clickMe.current = clickMe.current + 1;
          console.log(clickMe.current);
        }}
      >
        Click Me
      </button> */}
      <form className="expense-form" onSubmit={submitHandler}>
        <Input
          label="Title"
          name="title"
          id="title"
          value={expense.title}
          onChange={changeHandler}
          error={errors.title}
        />
        <Select
          label="Category"
          name="category"
          id="category"
          value={expense.category}
          onChange={changeHandler}
          error={errors.category}
          defaultValue="Select Category"
          allOptionValue={[
            "Grocery",
            "Clothes",
            "Bills",
            "Education",
            "Medicine",
          ]}
        />
        <Input
          label="Amount"
          name="amount"
          id="amount"
          value={expense.amount}
          onChange={changeHandler}
          error={errors.amount}
        />
        <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
      </form>
    </>
  );
}
