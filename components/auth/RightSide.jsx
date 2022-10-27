import { Icon } from "@iconify/react";
import React from "react";

export default function RightSide({ title, subtitle, body, iconRightSide }) {
  return (
    <div className="basis-[42%] pl-12 pr-40 pt-20">
      <Icon
        icon={"akar-icons:circle-check-fill"}
        className={`${
          iconRightSide ? "" : "hidden"
        } text-green-600 text-6xl mb-10`}
      />
      <h2 className="text-dark font-bold text-2xl">{title}</h2>
      <p className="text-[#3A3D4299] mt-7">{subtitle}</p>

      {body}
    </div>
  );
}
