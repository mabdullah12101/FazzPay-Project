import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import List from "./List";

export default function Aside({ page }) {
  return (
    <div className="hidden xl:block bg-white py-10 rounded-3xl w-72 shadow-lg">
      <ul className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between gap-y-12">
          <List icon={"akar-icons:grid"} content={"Dashboard"} page={page} />
          <List icon={"akar-icons:arrow-up"} content={"Transfer"} page={page} />
          <List icon={"akar-icons:plus"} content={"Top Up"} page={page} />
          <List icon={"charm:person"} content={"Profile"} page={page} />
        </div>
        <List icon={"carbon:logout"} content={"Logout"} />
      </ul>
    </div>
  );
}
