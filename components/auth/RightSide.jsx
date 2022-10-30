import { Icon } from "@iconify/react";
import React from "react";

export default function RightSide({
  title,
  subtitle,
  body,
  iconRightSide,
  titlePage,
}) {
  return (
    <div className="xl:basis-[42%] basis-full xl:pl-12 xl:pr-40 xl:pt-20 h-full xl:h-auto">
      <Icon
        icon={"akar-icons:circle-check-fill"}
        className={`${
          iconRightSide ? "" : "hidden"
        } text-green-600 text-6xl mb-10`}
      />

      <div className="hidden xl:block">
        <h2 className="text-dark font-bold text-2xl">{title}</h2>
        <p className="text-[#3A3D4299] mt-7">{subtitle}</p>
      </div>

      <div className="h-[20%] bg-[#f3f8ff] px-4 flex justify-center items-center xl:hidden">
        <div className="text-2xl text-primary font-semibold">FazzPay</div>
      </div>

      <div className="bg-white h-[80%] rounded-t-[2rem] shadow xl:bg-inherit xl:h-auto xl:shadow-none">
        <div className="px-4 text-center pt-10 xl:hidden">
          <h2 className="text-dark font-bold text-2xl">
            {titlePage === "Login"
              ? "Login"
              : titlePage === "Register"
              ? "Register"
              : titlePage === "Create Pin"
              ? "Create Security PIN"
              : titlePage === "Forgot Password"
              ? "Forgot Password"
              : titlePage === "Reset Password"
              ? "Reset Password"
              : ""}
          </h2>
          <p className="text-[#3A3D4299] mt-5 max-w-[343px] mx-auto">
            {titlePage === "Login"
              ? "Login to your existing account to access all the features in FazzPay."
              : titlePage === "Register"
              ? "Create your account to access FazzPay."
              : titlePage === "Create Pin"
              ? "Create a PIN that`s contain 6 digits number for security purpose in FazzPay."
              : titlePage === "Forgot Password"
              ? "Enter your FazzPay e-mail so we can send you a password reset link."
              : titlePage === "Reset Password"
              ? "Create and confirm your new password so you can login to FazzPay."
              : ""}
          </p>
        </div>

        <div className="px-4 xl:px-0">{body}</div>
      </div>
    </div>
  );
}
