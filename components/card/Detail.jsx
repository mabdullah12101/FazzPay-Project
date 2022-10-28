import React from "react";

export default function Detail({ title, content }) {
  return (
    <div className="rounded-lg shadow p-4">
      <p className="text-[#7A7886] mb-2">{title}</p>
      <p className="text-[22px] font-semibold text-[#514F5B]">{content}</p>
    </div>
  );
}
