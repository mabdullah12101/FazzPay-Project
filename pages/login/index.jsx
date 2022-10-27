import React from "react";
import Auth from "layout/auth";
import Input from "components/auth/Input";
import Button from "components/auth/Button";
import Navigate from "components/auth/Navigate";
import { useState } from "react";
import axiosClient from "utils/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const inputForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = await axiosClient.post("auth/login", form);
      setLoading(false);
      const authData = result.data.data;
      Cookies.set("token", authData.token);
      Cookies.set("userId", authData.id);

      if (authData.pin) {
        Cookies.set("pin", authData.pin);
        router.push("/home");
      } else {
        router.push("/create-pin");
      }
    } catch (error) {
      console.log(error);
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
                />
                <Input
                  icon={"codicon:lock"}
                  type={"password"}
                  name={"password"}
                  onChange={inputForm}
                  placeholder={"Enter your password"}
                />
              </div>
              <a className="text-sm text-[#3A3D42CC] cursor-pointer font-semibold block text-end mt-6">
                Forgot Password?
              </a>

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
