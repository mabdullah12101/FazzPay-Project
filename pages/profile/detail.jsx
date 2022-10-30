import Card from "components/profile/Card";
import MainHeader from "components/profile/MainHeader";
import Layout from "layout";
import React from "react";
import { useSelector } from "react-redux";

export default function DetailProfile() {
  const user = useSelector((state) => state.user.data);

  return (
    <Layout title="Detail Profile" page={"Profile"}>
      <div className="bg-white rounded-3xl shadow-lg px-7 pt-7 pb-12">
        <MainHeader
          title={"Personal Information"}
          content={
            "We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support."
          }
        />

        <div className="mt-10 grid gap-y-5">
          <Card title={"First Name"} content={user.firstName} />
          <Card title={"Last Name"} content={user.lastName} />
          <Card title={"Verified Email"} content={user.email} email={true} />
          <Card
            title={"Phone Number"}
            content={user.noTelp ? user.noTelp : "Phone Not Set"}
            phone={true}
          />
        </div>
      </div>
    </Layout>
  );
}
