import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ButtonContinue from "components/button/ButtonContinue";
import CardPeople from "components/card/People";
import CardDetail from "components/card/Detail";
import Button from "components/auth/Button";
import InputPin from "components/auth/InputPin";
import { useState } from "react";

export default function Confirmation() {
  const router = useRouter();
  const isLogin = Cookies.get("token");

  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    setPin({ ...pin, [e.target.name]: e.target.value });
  };

  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    console.log(allPin);
  };

  if (!isLogin) {
    router.push("/login");
  }

  const handleContinue = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleConfirmationPin = () => {
    router.push("/transfer/status");
  };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      {/* MODAL PIN CONFIRMATION */}
      <div
        className={`${
          modal ? "fixed" : "hidden"
        } w-full h-full bg-[rgba(0,0,0,0.4)] z-50`}
      >
        <div className="absolute top-[25%] left-[30%] bg-white w-[40%] px-9 py-10 rounded-3xl">
          <div className="flex justify-between">
            <h4 className="text-dark text-lg font-semibold">
              Enter PIN to Transfer
            </h4>
            <Icon
              icon={"carbon:close"}
              className={`text-3xl cursor-pointer`}
              onClick={handleClose}
            />
          </div>

          <p className="text-[#3A3D4299]">
            Enter your 6 digits PIN for confirmation to
            <br /> continue transferring money.{" "}
          </p>

          <form action="" className="mt-12" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-x-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <InputPin
                  key={item}
                  name={`pin${item}`}
                  tabIndex={item}
                  value={pin[`pin${item}`]}
                  onChange={handleChange}
                  onKeyUp={inputFocus}
                />
              ))}
            </div>

            <div className="text-end mt-16">
              <ButtonContinue handleContinue={handleConfirmationPin} />
            </div>
          </form>
        </div>
      </div>

      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <h2 className="text-lg text-dark font-semibold mb-6">Transfer To</h2>

          <CardPeople />

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

          <div className="text-end mt-14">
            <ButtonContinue handleContinue={handleContinue} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
