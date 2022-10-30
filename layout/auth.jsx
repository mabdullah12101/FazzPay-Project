import React from "react";
import LeftSide from "components/auth/LeftSide";
import RightSide from "components/auth/RightSide";
import Head from "next/head";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Auth({
  titlePage,
  title,
  subtitle,
  body,
  iconRightSide,
  toast,
}) {
  const router = useRouter();
  const token = Cookies.get("token");
  const pin = Cookies.get("pin");

  // useEffect(() => {
  //   if (titlePage === "Login" || titlePage === "Register") {
  //     token && !toast ? router.push("/home") : "";
  //   } else if (titlePage === "Create Pin" && !token) {
  //     router.push("/login");
  //   } else if (titlePage === "Create Pin" && token && pin) {
  //     router.push("/home");
  //   }
  // });

  return (
    <div
      className={
        !pin && token && titlePage === "Create Pin"
          ? ""
          : token && !toast
          ? "hidden"
          : ""
      }
    >
      <Head>
        <title>{titlePage} - FazzPay</title>
      </Head>
      <div className="xl:flex grid  xl:h-auto h-screen">
        <LeftSide />
        <RightSide
          title={title}
          subtitle={subtitle}
          body={body}
          iconRightSide={iconRightSide}
          titlePage={titlePage}
        ></RightSide>
      </div>
    </div>
  );
}
