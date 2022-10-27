import { useRouter } from "next/router";
import React from "react";

export default function Navigate({ content, navigate, navigatePage }) {
  const router = useRouter();
  return (
    <p className="text-dark text-center mt-3">
      {content}{" "}
      <span
        className="font-semibold text-primary cursor-pointer"
        onClick={() => router.push(navigatePage)}
      >
        {navigate}
      </span>
    </p>
  );
}
