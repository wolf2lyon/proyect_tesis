import React from "react";
import { Category } from "../utils/CategoryData";

export const SelectCategory = ({ setJobDescription }) => {
  const handleChange = (event) => {
    setJobDescription(event.target.value);
  };
  return (
    <div className="flex flex-col">
      <p className="text-[32px] text-white">Categoría</p>
      <select
        className="select text-black mt-4"
        defaultValue="Puestos"
        name="categoria"
        onChange={handleChange}
      >
        {Category.map((cat, idx) => (
          <option key={idx} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};
