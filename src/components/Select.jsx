import React from "react";

export default function Select({
  label,
  name,
  id,
  value,
  onChange,
  error,
  defaultValue,
  allOptionValue,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} value={value} onChange={onChange}>
        <option hidden>{defaultValue}</option>
        {allOptionValue.map((val) => {
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
