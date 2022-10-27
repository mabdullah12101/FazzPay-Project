import { Icon } from "@iconify/react";
import React from "react";
import List from "./List";

export default function Aside() {
  return (
    <div className="bg-white py-10 rounded-3xl h-[500px] w-72 shadow-lg">
      <ul className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between gap-y-12">
          <List icon={"akar-icons:grid"} active={true} content={"Dashboard"} />
          <List icon={"akar-icons:arrow-up"} content={"Transfer"} />
          <List icon={"akar-icons:plus"} content={"Top Up"} />
          <List icon={"charm:person"} content={"Profile"} />
        </div>
        <List icon={"carbon:logout"} content={"Logout"} />
      </ul>
    </div>
  );
}
