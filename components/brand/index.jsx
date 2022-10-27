import React from "react";

export default function Brand({ variant }) {
  return (
    <div
      className={`font-bold text-3xl ${
        variant === "blue" ? "text-primary" : ""
      }`}
    >
      FazzPay
    </div>
  );
}
