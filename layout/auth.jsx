import React from "react";
import LeftSide from "components/auth/LeftSide";
import RightSide from "components/auth/RightSide";
import Head from "next/head";

export default function Auth({
  titlePage,
  title,
  subtitle,
  body,
  iconRightSide,
}) {
  return (
    <>
      <Head>
        <title>{titlePage} - FazzPay</title>
      </Head>
      <div className="flex">
        <LeftSide />
        <RightSide
          title={title}
          subtitle={subtitle}
          body={body}
          iconRightSide={iconRightSide}
        ></RightSide>
      </div>
    </>
  );
}
