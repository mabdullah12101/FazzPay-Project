import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ButtonContinue from "components/button/ButtonContinue";
import CardPeople from "components/card/People";
import CardDetail from "components/card/Detail";
import { Icon } from "@iconify/react";

export default function Confirmation() {
  const router = useRouter();
  const isLogin = Cookies.get("token");

  if (!isLogin) {
    router.push("/login");
  }

  const handleContinue = () => {
    setModal(true);
  };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <div className="text-center mt-10">
            <Icon
              icon="akar-icons:circle-check-fill"
              className="text-6xl block mx-auto text-[#1EC15F] mb-5"
            />
            <p className="text-[#4D4B57] text-xl font-semibold">
              Transfer Success
            </p>
          </div>
          <h3 className="font-semibold text-lg mt-10 mb-6">Details</h3>

          <div className="grid gap-y-5">
            <CardDetail title={"Amount"} content={100000} />
            <CardDetail title={"Balance Left"} content={20000} />
            <CardDetail
              title={"Date & Time"}
              content={"May 11, 2020 - 12.20"}
            />
            <CardDetail title={"Notes"} content={"For Buying some socks"} />
          </div>

          <h2 className="text-lg text-dark font-semibold mb-6 mt-10">
            Transfer To
          </h2>
          <CardPeople />

          <div className="text-end mt-14">
            <ButtonContinue handleContinue={handleContinue} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
