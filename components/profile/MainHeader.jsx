import React from "react";

export default function MainHeader({ title, content }) {
  return (
    <>
      <h2 className="text-dark text-lg font-semibold">{title}</h2>
      <p className="text-[#7A7886] mt-6 max-w-[342px]">{content}</p>
    </>
  );
}
