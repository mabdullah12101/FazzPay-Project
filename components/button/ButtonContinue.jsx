import React from "react";

export default function ButtonContinue({ handleContinue }) {
  return (
    <button
      type="button"
      className="rounded-xl text-white bg-primary font-semibold py-4 px-12"
      onClick={handleContinue}
    >
      Continue
    </button>
  );
}
