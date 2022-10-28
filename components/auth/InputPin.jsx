import React from "react";
import { useState } from "react";

export default function InputPin({ name, value, tabIndex, onChange, onKeyUp }) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`border ${
        focus ? "border-primary" : "border-[#A9A9A999]"
      } bg-white rounded-lg flex justify-center items-center`}
    >
      <input
        type="text"
        autoComplete="off"
        name={name}
        value={value}
        tabIndex={tabIndex}
        onChange={onChange}
        onKeyUp={onKeyUp}
        pattern="\d*"
        className="w-4 text-3xl font-semibold py-3 rounded-lg focus:outline-none"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        maxLength="1"
        size="1"
      />
    </div>
  );
}
