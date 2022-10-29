import React from "react";
import Brand from "components/brand";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

export default function Header() {
  const dataUser = useSelector((state) => state.user.data);
  return (
    <div className="flex justify-between items-center text-dark py-8 bg-white px-36 rounded-b-3xl shadow-md">
      <Brand variant={"blue"} />
      <div className="flex items-center">
        <div className="w-14 h-14 rounded-xl mr-3">
          <Image
            src={dataUser.image ? dataUser.image : "/default-profile.png"}
            width={56}
            height={56}
            alt="profile"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">
            {dataUser.firstName + " " + dataUser.lastName}
          </p>
          <p className="opacity-90 text-sm">
            {dataUser.noTelp ? dataUser.noTelp : "Phone Not Set"}
          </p>
        </div>
        <Icon icon={"codicon:bell"} className={"text-2xl ml-6"} />
      </div>
    </div>
  );
}
