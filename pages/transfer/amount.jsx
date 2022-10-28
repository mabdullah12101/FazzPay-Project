import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ButtonContinue from "components/button/ButtonContinue";
import CardPeople from "components/card/People";

export default function TransferAmount() {
  const router = useRouter();
  const isLogin = Cookies.get("token");

  if (!isLogin) {
    router.push("/login");
  }

  const handleButtonContinue = () => {
    router.push("/transfer/confirmation");
  };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <h2 className="text-lg text-dark font-semibold mb-6">
            Transfer Money
          </h2>

          <CardPeople />

          <p className="text-[#7A7886] mt-5 mb-8">
            Type the amount you want to transfer and then <br /> press continue
            to the next steps.
          </p>

          <form action="" className="text-center">
            <input
              type="number"
              className="text-primary placeholder:text-[#B5BDCC] focus:outline-none text-[42px] text-center"
              placeholder="0.00"
            />

            <p className="text-dark font-semibold mt-4 mb-6">
              Rp120.000 Available
            </p>

            <div className="relative w-fit mx-auto">
              <input
                type="text"
                className="border-b-[1.5px] border-[#A9A9A999] placeholder:teks-[#A9A9A9CC] pl-10 py-2 w-80 focus:outline-none focus:border-primary peer"
                placeholder="Add some notes"
              />
              <Icon
                icon={"la:pen"}
                className={
                  "absolute top-0 bottom-0 my-auto text-3xl text-[#A9A9A999] peer-focus:text-primary"
                }
              />
            </div>

            <div className="text-end mt-10">
              <ButtonContinue handleContinue={handleButtonContinue} />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
