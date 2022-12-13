import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Cookies from "js-cookie";

export default function LandingPage() {
  const router = useRouter();
  const [hamburger, setHamburger] = useState(false);
  const token = Cookies.get("token");

  return (
    <div className={`h-screen flex flex-col overflow-hidden`}>
      <Head>
        <title>FazzPay</title>
      </Head>
      <header className={`${hamburger ? "h-screen" : ""} flex flex-col`}>
        <div className="flex justify-between items-center shadow-md p-4 sm:p-6 xl:px-12">
          <div
            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl xl:text-3xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            FazzPay
          </div>
          {token ? (
            <button
              className="hidden sm:block bg-primary sm:text-sm xl:text-lg text-white shadow w-28 xl:w-32 py-3 font-semibold rounded-xl"
              onClick={() => router.push("/home")}
            >
              Dashboard
            </button>
          ) : (
            <div className="hidden sm:flex sm:gap-x-2 xl:gap-x-4">
              <button
                className="bg-white sm:text-sm xl:text-lg text-primary border-primary shadow border-2 w-24 xl:w-28 py-2 xl:py-3 font-semibold rounded-xl"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="bg-primary sm:text-sm xl:text-lg text-white shadow w-24 xl:w-28 py-2 xl:py-3 font-semibold rounded-xl"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </div>
          )}
          <div className="sm:hidden">
            <button onClick={() => setHamburger(!hamburger)}>
              {hamburger ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 ${
            hamburger ? "flex" : "hidden"
          } flex-col gap-y-4 justify-center items-center px-4 sm:hidden`}
        >
          {token ? (
            <button
              className="bg-primary sm:text-sm xl:text-lg text-white shadow w-28 xl:w-32 py-3 font-semibold rounded-xl"
              onClick={() => router.push("/home")}
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                className="bg-white text-primary border-primary shadow border-2 w-28 py-2 font-semibold rounded-xl"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="bg-primary text-white shadow w-28 py-2 font-semibold rounded-xl"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>

      <section
        className={`flex-1 ${
          hamburger ? "hidden" : "grid"
        } grid-cols-12 px-4 sm:px-6 md:px-6 xl:px-36 items-center`}
      >
        <div className="col-span-6 text-center">
          <Image
            src={"/hero-img.png"}
            width={350}
            height={650}
            alt="image-hero"
          />
        </div>
        <div className="col-span-6">
          <div className="font-bold text-dark text-2xl sm:text-4xl md:text-5xl xl:text-6xl mb-5 xl:mb-10">
            Awesome App <br /> For Saving{" "}
            <span className="text-primary">Time</span>.
          </div>
          <p className="xl:text-lg sm:max-w-[300px] md:max-w-sm text-[#3A3D42] mb-6 xl:mb-12">
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>
          <button className="font-semibold xl:text-lg text-white bg-primary px-11 py-3 rounded-xl mb-6 xl:mb-12">
            Try It Free
          </button>
          <p className="xl:text-lg text-[#3A3D42] mb-3 xl:mb-6">Available on</p>

          <div className="flex gap-x-4">
            <div className="w-8 h-8 xl:w-12 xl:h-12">
              <Image
                src={"/gplay.png"}
                layout={"responsive"}
                height={1}
                width={1}
                alt="google-play-store"
              />
            </div>
            <div className="w-8 h-8 xl:w-12 xl:h-12">
              <Image
                src={"/appstore.png"}
                layout={"responsive"}
                height={1}
                width={1}
                alt="google-play-store"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
