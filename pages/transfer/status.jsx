import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ButtonContinue from "components/button/ButtonContinue";
import CardPeople from "components/card/People";
import CardDetail from "components/card/Detail";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

export default function Confirmation() {
  const router = useRouter();
  const isLogin = Cookies.get("token");
  const dataUser = useSelector((state) => state.transfer.user);
  const transfer = useSelector((state) => state.transfer);
  const detailTransfer = transfer.detailTransfer;
  const balance = useSelector((state) => state.user.data.balance);

  if (!isLogin) {
    router.push("/login");
  }

  const handleContinue = () => {
    setModal(true);
  };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          {transfer.isError ? (
            <div className="text-center mt-10 mb-16">
              <Icon
                icon="akar-icons:circle-x-fill"
                className="text-6xl block mx-auto text-error mb-5"
              />
              <p className="text-[#4D4B57] text-xl font-semibold">
                Transfer Failed
              </p>
              <p className="text-[#7A7886]">
                We can`t transfer your money at the moment, we recommend you to
                check your <br /> internet connection and try again.
              </p>
            </div>
          ) : (
            <div className="text-center my-10">
              <Icon
                icon="akar-icons:circle-check-fill"
                className="text-6xl block mx-auto text-[#1EC15F] mb-5"
              />
              <p className="text-[#4D4B57] text-xl font-semibold">
                Transfer Success
              </p>
            </div>
          )}

          <h3 className="font-semibold text-lg mb-6">Details</h3>

          <div className="grid gap-y-5">
            <CardDetail
              title={"Amount"}
              content={`Rp${Number(detailTransfer.amount).toLocaleString()}`}
            />
            <CardDetail
              title={"Balance Left"}
              content={`Rp${Number(balance).toLocaleString()}`}
            />
            <CardDetail
              title={"Date & Time"}
              content={transfer.dateTimeTransfer}
            />
            <CardDetail title={"Notes"} content={detailTransfer.notes} />
          </div>

          <h2 className="text-lg text-dark font-semibold mb-6 mt-10">
            Transfer To
          </h2>
          <CardPeople data={dataUser} />

          <form
            className="text-end mt-14"
            onSubmit={(e) => {
              e.preventDefault();
              transfer.isError
                ? router.push("/transfer")
                : router.push("/home");
            }}
          >
            <ButtonContinue
              status={true}
              content={transfer.isError ? "Try Again" : "Back to Home"}
            />
          </form>
        </div>
      </Layout>
    </div>
  );
}
