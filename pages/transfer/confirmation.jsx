import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ButtonContinue from "components/button/ButtonContinue";
import CardPeople from "components/card/People";
import CardDetail from "components/card/Detail";
import InputPin from "components/auth/InputPin";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "utils/axios";
import { createTransfer } from "stores/action/transfer";
import { getDataUserById } from "stores/action/user";

export default function Confirmation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const dataUser = useSelector((state) => state.transfer.user);
  const transfer = useSelector((state) => state.transfer);
  const detailTransfer = transfer.detailTransfer;
  const balance = useSelector((state) => state.user.data.balance);
  const isLogin = Cookies.get("token");
  const userId = Cookies.get("userId");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let allPin = "";
      for (const item in pin) {
        allPin += pin[item];
      }
      setIsError(false);
      setLoading(true);
      await axiosClient.get(`user/pin/${allPin}`);
      dispatch(createTransfer(detailTransfer)).then(() => {
        dispatch(getDataUserById(userId));
        router.push("/transfer/status");
      });
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
      setLoading(false);
      setToast(true);
      handleClose();
    }
  };

  if (!isLogin) {
    router.push("/login");
  }

  const handleClose = () => {
    setPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
    setModal(false);
  };

  const handleCloseToast = () => {
    if (isError) {
      setToast(false);
      handleClose();
    } else {
      router.push("/home");
    }
  };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <div
        id="toast"
        className={`${
          message && toast ? "flex" : "hidden"
        } items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed mx-auto left-0 right-0 top-10 z-50`}
        role="alert"
      >
        <div
          className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 ${
            isError
              ? "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
              : "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
          } `}
        >
          {isError ? (
            <>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Error icon</span>
            </>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Check icon</span>
            </>
          )}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={handleCloseToast}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

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
              <ButtonContinue isLoading={loading} />
            </div>
          </form>
        </div>
      </div>

      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <h2 className="text-lg text-dark font-semibold mb-6">Transfer To</h2>

          <CardPeople data={dataUser} />

          <h3 className="font-semibold text-lg mt-10 mb-6">Details</h3>

          <div className="grid gap-y-5">
            <CardDetail
              title={"Amount"}
              content={`Rp${Number(detailTransfer.amount).toLocaleString()}`}
            />
            <CardDetail
              title={"Balance Left"}
              content={`Rp${Number(
                balance - detailTransfer.amount
              ).toLocaleString()}`}
            />
            <CardDetail
              title={"Date & Time"}
              content={transfer.dateTimeTransfer}
            />
            <CardDetail title={"Notes"} content={detailTransfer.notes} />
          </div>

          <form
            className="text-end mt-14"
            onSubmit={(e) => {
              e.preventDefault();
              setModal(true);
            }}
          >
            <ButtonContinue />
          </form>
        </div>
      </Layout>
    </div>
  );
}
