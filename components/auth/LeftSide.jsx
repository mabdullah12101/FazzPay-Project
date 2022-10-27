import React from "react";
import Image from "next/image";
import Brand from "components/brand";

export default function LeftSide() {
  return (
    <div className="basis-[58%] bg-[url('/bg-auth.png')] bg-cover bg-[center_top_-1rem] text-white pl-32 pt-12 pb-12">
      <Brand />

      <Image
        src={"/phone-auth.png"}
        width={"400"}
        height={"450"}
        alt="image-phone"
      />

      <h2 className="font-bold text-2xl mb-7">
        App that Covering Banking Needs.
      </h2>
      <p className="text-[#FFFFFFCC] max-w-lg">
        FazzPay is an application that focussing in banking needs for all users
        in the world. Always updated and always following world trends. <br />{" "}
        5000+ users registered in FazzPay everyday with worldwide <br /> users
        coverage.
      </p>
    </div>
  );
}
