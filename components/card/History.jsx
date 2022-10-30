import Image from "next/image";
import React from "react";

export default function History({ data }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-3">
        <div className="w-14 h-14">
          <Image
            src={
              data.image
                ? process.env.URL_CLOUDINARY + data.image
                : "/default-profile.png"
            }
            width={1}
            height={1}
            layout={"responsive"}
            alt="image-people"
          />
        </div>
        <div className="grid gap-y-1">
          <p className="text-[#4D4B57] font-semibold">
            {data.firstName + " " + data.lastName}
          </p>
          <p className="text-[#7A7886] text-sm">
            {data.type === "topup"
              ? "Top Up"
              : data.type === "send"
              ? "Transfer"
              : "Accept"}
          </p>
        </div>
      </div>
      <p
        className={`${
          data.type === "accept" ? "text-[#1EC15F]" : "text-error"
        } font-semibold`}
      >{`${data.type === "send" ? "-" : "+"}Rp${Number(
        data.amount
      ).toLocaleString()}`}</p>
    </div>
  );
}
