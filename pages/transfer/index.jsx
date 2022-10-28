import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import CardPeople from "components/card/People";

export default function Transfer() {
  const router = useRouter();
  const isLogin = Cookies.get("token");

  if (!isLogin) {
    router.push("/login");
  }

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <h2 className="text-lg text-dark font-semibold mb-4">
            Search Receiver
          </h2>

          <form action="" className="mb-10">
            <div className="relative">
              <Icon
                icon={"bx:search"}
                className="absolute text-[#A9A9A9] text-2xl top-0 bottom-0 left-3 my-auto"
              />
              <input
                type="text"
                className="w-full rounded-xl bg-[#3A3D421A] placeholder:text-[#3A3D4266] px-12 py-3 focus:outline-blue-500 focus:ring-blue-500 focus:bg-white"
                placeholder="Search receiver here"
              />
            </div>
          </form>

          <div className="grid gap-y-5 overflow-auto h-96 pr-3">
            <CardPeople />
            <CardPeople />
            <CardPeople />
            <CardPeople />
            <CardPeople />
          </div>
        </div>
      </Layout>
    </div>
  );
}
