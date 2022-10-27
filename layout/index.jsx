import React from "react";
import Header from "components/header";
import Head from "next/head";
import Aside from "components/aside";
import Footer from "components/footer";

export default function Layout(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.title} - FazzPay</title>
        <meta name="Fazzpay" content="Lorem40" />
      </Head>

      <Header />

      <div className="px-40 mt-10 flex mb-20">
        <Aside />
        <main>{props.children}</main>
      </div>

      <Footer />
    </>
  );
}
