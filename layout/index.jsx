import React from "react";
import Header from "components/header";
import Head from "next/head";
import Aside from "components/aside";
import Footer from "components/footer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Layout({ title, page, children }) {
  const router = useRouter();
  const token = Cookies.get("token");

  if (!token) {
    router.push("/login");
  }

  return token ? (
    <>
      <Head>
        <title>{title} - FazzPay</title>
        <meta name="Fazzpay" content="Lorem40" />
      </Head>

      <Header />

      <div className="px-40 mt-10 flex mb-20 gap-x-5">
        <Aside page={page} />
        <main className="w-full">{children}</main>
      </div>

      <Footer />
    </>
  ) : (
    ""
  );
}
