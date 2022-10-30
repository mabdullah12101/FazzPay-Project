import React, { useState } from "react";
import Auth from "layout/auth";
import Input from "components/auth/Input";
import Button from "components/auth/Button";
import axiosClient from "utils/axios";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const router = useRouter();
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    linkDirect: "http://localhost:3000/reset-password",
  });

  const inputForm = (e) => {
    setMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      setIsError(false);
      setLoading(true);
      const result = await axiosClient.post("auth/forgot-password", form);
      setLoading(false);
      setMessage(result.data.msg);
      setToast(true);
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.msg);
      setIsError(true);
      setToast(true);
    }
  };

  const handleClose = () => {
    setToast(false);
    if (isError) {
      setForm({
        email: "",
        linkDirect: "http://localhost:3000/reset-password",
      });
    } else {
      router.push("/login");
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
        titlePage={"Forgot Password"}
        title={
          "Did You Forgot Your Password? Dont Worry, You Can Reset Your Password In a Minutes."
        }
        subtitle={
          "To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens."
        }
        toast={toast}
        body={
          <>
            <form className="mt-10" onSubmit={handleForgotPassword}>
              <div className="grid gap-y-7">
                <Input
                  icon={"codicon:mail"}
                  type={"email"}
                  name={"email"}
                  onChange={inputForm}
                  placeholder={"Enter your e-mail"}
                  isError={isError}
                  value={form.email}
                />
              </div>

              <p
                className="text-center mt-8 font-medium text-error"
                hidden={isError ? false : true}
              >
                {message}
              </p>

              <Button
                content={"Confirm"}
                isLoading={loading}
                disable={toast ? true : form.email ? false : true}
              />
            </form>
          </>
        }
      />
    </>
  );
}
