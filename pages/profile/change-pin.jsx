import React from "react";
import MainHeader from "components/profile/MainHeader";
import Layout from "layout";
import InputPin from "components/auth/InputPin";
import { useState } from "react";
import Button from "components/auth/Button";
import { useDispatch, useSelector } from "react-redux";
import { checkPin, getDataUserById, updatePin } from "stores/action/user";
import { useRouter } from "next/router";

export default function ChangePin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [toast, setToast] = useState(false);
  const [isPin, setIsPin] = useState(false);
  console.log(toast);

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

  const handleSubmitCheckPin = async (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    dispatch(checkPin(allPin))
      .then(() => {
        setToast(true);
        setPin({
          pin1: "",
          pin2: "",
          pin3: "",
          pin4: "",
          pin5: "",
          pin6: "",
        });
      })
      .catch(() => {
        setToast(true);
      });
  };

  const handleSubmitUpdatePin = (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    dispatch(updatePin(user.data.id, { pin: allPin }));
    setToast(true);
  };

  const handleCloseToast = () => {
    setToast(false);
    if (user.isError) {
      setPin({
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",
        pin5: "",
        pin6: "",
      });
    } else if (isPin) {
      dispatch(getDataUserById(user.data.id));
      router.push("/profile");
    } else {
      setIsPin(true);
    }
  };

  return (
    <Layout title="Profile" page={"Profile"}>
      <div
        id="toast"
        className={`${
          user.message && toast ? "flex" : "hidden"
        } items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed mx-auto left-0 right-0 top-10 z-50`}
        role="alert"
      >
        <div
          className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 ${
            user.isError
              ? "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
              : "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
          } `}
        >
          {user.isError ? (
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
        <div className="ml-3 text-sm font-normal">{user.message}</div>
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

      <div className="bg-white rounded-3xl shadow-lg px-7 pt-7 pb-36">
        {isPin ? (
          <div>
            <MainHeader
              title={"Change PIN"}
              content={"Type your new 6 digits security PIN to use in Fazzpay."}
            />

            <form
              action=""
              className="w-[431px] mx-auto text-center mt-24"
              onSubmit={handleSubmitUpdatePin}
            >
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
                content={"Change PIN"}
                isLoading={user.isLoading}
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
          </div>
        ) : (
          <div>
            <MainHeader
              title={"Change PIN"}
              content={
                "Enter your current 6 digits Fazzpay PIN below to continue to the next steps."
              }
            />

            <form
              action=""
              className="w-[431px] mx-auto text-center mt-24"
              onSubmit={handleSubmitCheckPin}
            >
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
                content={"Continue"}
                isLoading={user.isLoading}
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
          </div>
        )}
      </div>
    </Layout>
  );
}
