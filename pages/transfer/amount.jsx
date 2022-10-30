import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ButtonContinue from "components/button/ButtonContinue";
import CardPeople from "components/card/People";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { transferData } from "stores/action/transfer";
import user from "stores/reducer/user";

export default function TransferAmount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const dataUser = useSelector((state) => state.transfer.user);
  const balance = user.data.balance;
  const [detailTransfer, setDetailTransfer] = useState({
    receiverId: dataUser.id,
  });
  const isLogin = Cookies.get("token");

  if (!isLogin) {
    router.push("/login");
  }

  const handleOnChange = (e) => {
    setDetailTransfer({ ...detailTransfer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(detailTransfer);
    dispatch(transferData(detailTransfer));
    router.push("/transfer/confirmation");
  };

  // const handleButtonContinue = () => {
  //   router.push("/transfer/confirmation");
  // };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Transfer" page={"Transfer"}>
        {user.isLoading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
            <h2 className="text-lg text-dark font-semibold mb-6">
              Transfer Money
            </h2>

            <CardPeople data={dataUser} />

            <p className="text-[#7A7886] mt-5 mb-8">
              Type the amount you want to transfer and then <br /> press
              continue to the next steps.
            </p>

            <form action="" className="text-center" onSubmit={handleSubmit}>
              <input
                type="number"
                className="text-primary placeholder:text-[#B5BDCC] focus:outline-none text-[42px] text-center"
                placeholder="0.00"
                name="amount"
                min={1001}
                max={balance}
                onChange={handleOnChange}
              />

              <p className="text-dark font-semibold mt-4 mb-6">
                {`Rp ${balance.toLocaleString()} Available`}
              </p>

              <div className="relative w-fit mx-auto">
                <input
                  type="text"
                  className="border-b-[1.5px] border-[#A9A9A999] placeholder:teks-[#A9A9A9CC] pl-10 py-2 w-80 focus:outline-none focus:border-primary peer"
                  placeholder="Add some notes"
                  name="notes"
                  onChange={handleOnChange}
                />
                <Icon
                  icon={"la:pen"}
                  className={
                    "absolute top-0 bottom-0 my-auto text-3xl text-[#A9A9A999] peer-focus:text-primary"
                  }
                />
              </div>

              <div className="text-end mt-10">
                <ButtonContinue />
              </div>
            </form>
          </div>
        )}
      </Layout>
    </div>
  );
}
