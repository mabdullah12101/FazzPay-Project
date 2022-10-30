import Image from "next/image";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <header className="flex justify-between items-center px-36 pt-10">
        <div className="text-primary font-semibold text-3xl">FazzPay</div>
        <div className="flex gap-x-7">
          <button className="bg-white text-lg text-primary border-primary shadow border-2 w-28 py-2 font-semibold rounded-xl">
            Login
          </button>
          <button className="bg-primary text-lg text-white shadow w-28 py-2 font-semibold rounded-xl">
            Register
          </button>
        </div>
      </header>

      <section className="grid grid-cols-12 px-36 items-center">
        <div className="col-span-6 text-center">
          <Image
            src={"/hero-img.png"}
            width={350}
            height={650}
            alt="image-hero"
          />
        </div>
        <div className="col-span-6">
          <div className="font-bold text-dark text-6xl mb-10">
            Awesome App <br /> For Saving{" "}
            <span className="text-primary">Time</span>.
          </div>
          <p className="text-lg text-[#3A3D42] mb-12">
            We bring you a mobile app for banking problems that <br /> oftenly
            wasting much of your times.
          </p>
          <button className="font-semibold text-lg text-white bg-primary px-11 py-3 rounded-xl mb-12">
            Try It Free
          </button>
          <p className="text-lg text-[#3A3D42] mb-6">Available on</p>

          <div className="flex gap-x-4">
            <div className="w-12 h-12">
              <Image
                src={"/gplay.png"}
                layout={"responsive"}
                height={1}
                width={1}
                alt="google-play-store"
              />
            </div>
            <div className="w-12 h-12">
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
    </>
  );
}
