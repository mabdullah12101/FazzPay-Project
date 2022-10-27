import React from "react";

export default function InputPin({ name, value }) {
  return (
    <div className="border border-[#A9A9A999] bg-white rounded-lg flex justify-center items-center">
      <input
        type="text"
        name={name}
        value={value}
        pattern="\d*"
        className="w-4 text-3xl font-semibold py-3 rounded-lg focus:outline-none"
        maxLength="1"
        size="1"
      />
    </div>
  );
}
