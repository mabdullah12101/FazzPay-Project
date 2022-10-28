import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const isLogin = Cookies.get("token");

  if (!isLogin) {
    router.push("/login");
  }

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Home" page={"Dashboard"}>
        <h1 className="font-bold text-4xl text-center mt-10">Home</h1>
        <div className="h-[27rem]"></div>
      </Layout>
    </div>
  );
}
