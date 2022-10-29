import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import axiosClient from "utils/axios";

export default function ListProfile({ content }) {
  const router = useRouter();

  const handleNavigate = () => {
    switch (content) {
      case "Personal Information":
        router.push("/profile/detail");
        break;
      case "Change Password":
        router.push("/profile/change-password");
        break;
      case "Change PIN":
        router.push("/profile/change-pin");
        break;
      case "Logout":
        axiosClient.post("auth/logout");
        Object.keys(Cookies.get()).map((item) => {
          Cookies.remove(item);
        });
        router.push("/login");

      default:
        break;
    }
  };

  return (
    <div>
      <button
        className="text-[#4D4B57] font-semibold bg-[#E5E8ED] flex justify-between items-center py-5 px-5 rounded-lg w-[433px]"
        onClick={handleNavigate}
      >
        <p>{content}</p>
        <Icon
          icon={"akar-icons:arrow-right"}
          className={`text-2xl ${content === "Logout" ? "hidden" : ""}`}
        />
      </button>
    </div>
  );
}
