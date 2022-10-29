import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { detailUser } from "stores/action/transfer";

export default function People({ data, navigate }) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div
      className={`flex items-center gap-x-5 pl-5 py-5 rounded-lg shadow-md ${
        navigate ? "cursor-pointer" : ""
      }`}
      onClick={
        navigate
          ? () => {
              dispatch(detailUser(data));
              router.push("/transfer/amount");
            }
          : () => {}
      }
    >
      <div className="w-16 h-16 rounded-lg">
        <Image
          src={
            data.image
              ? process.env.URL_CLOUDINARY + data.image
              : "/default-profile.png"
          }
          width={1}
          height={1}
          layout={"responsive"}
          alt="people-image"
        />
      </div>
      <div>
        <p className="text-lg text-[#4D4B57] font-semibold mb-1">
          {data.firstName + " " + data.lastName}
        </p>
        <p className="text-[#7A7886]">
          {data.noTelp ? data.noTelp : "Phone Not Set"}
        </p>
      </div>
    </div>
  );
}
