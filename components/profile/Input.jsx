import { Icon } from "@iconify/react";
import React from "react";

export default function Input({ id, type, placeholder, icon, onChange }) {
  return (
    <label htmlFor={id} className="w-full relative block">
      <input
        type={type}
        id={id}
        name={id}
        className="w-full px-10 py-3 placeholder:text-[#A9A9A9CC] border-b-[1.5px] border-[#A9A9A999] peer focus:outline-none focus:border-primary"
        placeholder={placeholder}
        onChange={onChange}
      />
      <Icon
        icon={icon}
        className={
          "absolute top-0 bottom-0 my-auto text-[#A9A9A999] text-xl peer-focus:text-primary"
        }
      />
    </label>
  );
}
