import React from "react";
import Auth from "layout/auth";
import Button from "components/auth/Button";
import InputPin from "components/auth/InputPin";

export default function CreatePin() {
  const pin = false;
  return pin ? (
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
            <form action="" className="mt-12">
              <div className="grid grid-cols-6 gap-x-6">
                <InputPin name={"pin1"} />
                <InputPin name={"pin2"} />
                <InputPin name={"pin3"} />
                <InputPin name={"pin4"} />
                <InputPin name={"pin5"} />
                <InputPin name={"pin6"} />
              </div>

              <Button content={"Confirm"} />
            </form>
          </>
        }
      />
    </>
  );
}
