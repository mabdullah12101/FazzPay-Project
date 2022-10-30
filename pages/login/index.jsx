import React from "react";
import Auth from "layout/auth";
import Input from "components/auth/Input";
import Button from "components/auth/Button";
import Navigate from "components/auth/Navigate";
import { useState } from "react";
import axiosClient from "utils/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getDataUserById } from "stores/action/user";
import { getDataDashboard } from "stores/action/dashboard";
import { getDataHistory } from "stores/action/history";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [authData, setAuthData] = useState({});

  const inputForm = (e) => {
    setMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsError(false);
      setLoading(true);
      const result = await axiosClient.post("auth/login", form);
      setLoading(false);
      setMessage(result.data.msg);
      setAuthData(result.data.data);
      const dataResult = result.data.data;
      Cookies.set("token", dataResult.token);
      Cookies.set("userId", dataResult.id);
      dispatch(getDataUserById(dataResult.id));
      dispatch(getDataDashboard(dataResult.id));
      dispatch(getDataHistory());
      setToast(true);
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.msg);
      setIsError(true);
      setToast(true);
    }
  };

  const handleClose = () => {
    if (isError) {
      setToast(false);
    } else if (authData.pin) {
      Cookies.set("pin", authData.pin);
      router.push("/home");
    } else {
      router.push("/create-pin");
    }
  };

  return (
    <>
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
          onClick={handleClose}
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
      <Auth
        titlePage={"Login"}
        title={
          "Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users"
        }
        subtitle={
          "Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!"
        }
        toast={toast}
        body={
          <>
            <form className="mt-10" onSubmit={handleLogin}>
              <div className="grid gap-y-7">
                <Input
                  icon={"codicon:mail"}
                  type={"email"}
                  name={"email"}
                  onChange={inputForm}
                  placeholder={"Enter your e-mail"}
                  isError={isError}
                />
                <Input
                  icon={"codicon:lock"}
                  type={"password"}
                  name={"password"}
                  onChange={inputForm}
                  placeholder={"Enter your password"}
                  isError={isError}
                />
              </div>
              <a
                className="text-sm text-[#3A3D42CC] cursor-pointer font-semibold block text-end mt-6"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot Password?
              </a>

              <p
                className="text-center mt-8 font-medium text-error"
                hidden={isError ? false : true}
              >
                {message}
              </p>

              <Button
                content={"Login"}
                isLoading={loading}
                disable={
                  toast ? true : form.email && form.password ? false : true
                }
              />
              <Navigate
                content={"Don't have an account? Let's"}
                navigate={"Register"}
                navigatePage={"/register"}
              />
            </form>
          </>
        }
      />
    </>
  );
}
