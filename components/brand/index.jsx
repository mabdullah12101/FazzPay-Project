import { useRouter } from "next/router";
import React from "react";

export default function Brand({ variant }) {
  const router = useRouter();
  return (
    <div
      className={`font-bold text-3xl cursor-pointer ${
        variant === "blue" ? "text-primary" : ""
      }`}
      onClick={() => router.push("/")}
    >
      FazzPay
    </div>
  );
}
