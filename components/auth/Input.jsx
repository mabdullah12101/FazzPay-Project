import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Input({
  type,
  name,
  id,
  value,
  placeholder,
  icon,
  onChange,
  isError,
}) {
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(isError);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  return (
    <div
      className={`relative border-b-[1.5px] ${
        focus ? "border-primary" : "border-[#A9A9A999]"
      } ${error ? "border-error" : ""}`}
    >
      <Icon
        icon={icon}
        className={`absolute text-2xl top-3 ${
          focus ? "text-primary" : "text-[#A9A9A999]"
        } ${error ? "text-error" : ""}`}
      />
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => {
          setFocus(true);
          setError(false);
        }}
        onBlur={() => setFocus(false)}
        required={true}
        className="pl-10 py-3 w-full text-dark font-medium placeholder:text-[#A9A9A9CC] placeholder:font-normal focus:outline-none bg-transparent"
      />
    </div>
  );
}
