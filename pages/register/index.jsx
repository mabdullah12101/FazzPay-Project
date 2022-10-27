import React from "react";
import Auth from "layout/auth";
import Input from "components/auth/Input";
import Button from "components/auth/Button";
import Navigate from "components/auth/Navigate";

export default function Register() {
  return (
    <>
      <Auth
        titlePage={"Register"}
        title={
          "Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users"
        }
        subtitle={
          "Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!"
        }
        body={
          <>
            <form className="mt-7">
              <div className="grid gap-y-7">
                <Input
                  icon={"charm:person"}
                  type={"text"}
                  name={"firstName"}
                  placeholder={"Enter your firstname"}
                />
                <Input
                  icon={"charm:person"}
                  type={"text"}
                  name={"lastName"}
                  placeholder={"Enter your lastname"}
                />
                <Input
                  icon={"codicon:mail"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Enter your e-mail"}
                />
                <Input
                  icon={"codicon:lock"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Enter your password"}
                />
              </div>

              <Button content={"Sign Up"} />
              <Navigate
                content={"Already have an account? Let's"}
                navigate={"Login"}
                navigatePage={"/login"}
              />
            </form>
          </>
        }
      />
    </>
  );
}
