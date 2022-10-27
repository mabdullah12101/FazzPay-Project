import React from "react";
import { Icon } from "@iconify/react";

export default function List({ active, icon, content }) {
  return (
    <li
      className={`flex items-center pl-7 gap-x-4 ${
        active
          ? "text-primary border-l-4 border-primary font-semibold"
          : "text-dark pl-8"
      }`}
    >
      <Icon icon={icon} className={`text-2xl`} />
      <span className="text-lg">{content}</span>
    </li>
  );
}
