import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function People() {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-x-5 pl-5 py-5 rounded-lg shadow-md cursor-pointer"
      onClick={() => router.push("/transfer/amount")}
    >
      <div className="w-16 h-16 rounded-lg">
        <Image
          src={"/profile.png"}
          width={1}
          height={1}
          layout={"responsive"}
          alt="people-image"
        />
      </div>
      <div>
        <p className="text-lg text-[#4D4B57] font-semibold mb-1">Samuel Suhi</p>
        <p className="text-[#7A7886]">+62 813-8492-9994</p>
      </div>
    </div>
  );
}
