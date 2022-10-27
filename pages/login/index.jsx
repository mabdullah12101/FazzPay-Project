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

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
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
      const authData = result.data.data;
      Cookies.set("token", authData.token);
      Cookies.set("userId", authData.id);
      dispatch(getDataUserById(authData.id));

      if (authData.pin) {
        Cookies.set("pin", authData.pin);
        router.push("/home");
      } else {
        router.push("/create-pin");
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.msg);
      setIsError(true);
    }
  };
  return (
    <>
      <Auth
        titlePage={"Login"}
        title={
          "Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users"
        }
        subtitle={
          "Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!"
        }
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
              <a className="text-sm text-[#3A3D42CC] cursor-pointer font-semibold block text-end mt-6">
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
                disable={form.email && form.password ? false : true}
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
