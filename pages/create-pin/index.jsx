import React, { useEffect } from "react";
import Auth from "layout/auth";
import Button from "components/auth/Button";
import InputPin from "components/auth/InputPin";
import { useState } from "react";
import Cookies from "js-cookie";
import axiosClient from "utils/axios";
import { useRouter } from "next/router";

export default function CreatePin() {
  const router = useRouter();
  const userId = Cookies.get("userId");
  const [isPin, setIsPin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Cookies.get("pin") ? router.push("/home") : "";
  });

  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let allPin = "";
      for (const item in pin) {
        allPin += pin[item];
      }
      const result = await axiosClient.patch(`user/pin/${userId}`, {
        pin: allPin,
      });
      console.log(result);
      setLoading(false);
      setIsPin(true);
      Cookies.set("pin", allPin);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return isPin ? (
    <>
      <Auth
        iconRightSide={true}
        titlePage={"Create Pin"}
        title={"Your PIN Was Successfully Created"}
        subtitle={
          "Your PIN was successfully created and you can now access all the features in FazzPay."
        }
        body={<Button content={"Go To Dashboard"} icon={true} />}
      />
    </>
  ) : (
    <>
      <Auth
        titlePage={"Create Pin"}
        title={
          "Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself."
        }
        subtitle={
          "Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN."
        }
        body={
          <>
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

              <Button
                content={"Confirm"}
                isLoading={loading}
                disable={
                  pin.pin1 &&
                  pin.pin2 &&
                  pin.pin3 &&
                  pin.pin4 &&
                  pin.pin5 &&
                  pin.pin6
                    ? false
                    : true
                }
              />
            </form>
          </>
        }
      />
    </>
  );
}
