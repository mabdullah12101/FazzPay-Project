import Layout from "layout";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import ListProfile from "components/ListProfile";
import { useState } from "react";
import { getDataUserById, updateImage } from "stores/action/user";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userData = user.data;
  const [toast, setToast] = useState(false);
  const [newImage, setNewImage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const lengthImage = Object.keys(newImage).length;
  console.log(toast);

  const handleInputImage = (e) => {
    const { name, files } = e.target;
    setNewImage({ [name]: files[0] });
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const handleUpdateImage = () => {
    const imageData = new FormData();
    imageData.append("image", newImage.image);
    dispatch(updateImage(userData.id, imageData)).then(() => {
      setToast(true);
    });
  };

  const handleCloseToast = () => {
    dispatch(getDataUserById(userData.id));
    setNewImage({});
    setToast(false);
  };

  return (
    <Layout title="Profile" page={"Profile"}>
      <div
        id="toast"
        className={`${
          user.message && toast ? "flex" : "hidden"
        } items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed mx-auto left-0 right-0 top-10 z-50`}
        role="alert"
      >
        <div
          className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 ${
            user.isError
              ? "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
              : "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
          } `}
        >
          {user.isError ? (
            <>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Error icon</span>
            </>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Check icon</span>
            </>
          )}
        </div>
        <div className="ml-3 text-sm font-normal">{user.message}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={handleCloseToast}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-lg px-7 pt-12 pb-16">
        <div className="grid xl:justify-center text-center">
          <div className="w-20 h-20 rounded-lg mx-auto mb-3 overflow-hidden">
            <Image
              src={
                lengthImage > 0
                  ? imagePreview
                  : userData.image
                  ? process.env.URL_CLOUDINARY + userData.image
                  : "/default-profile.png"
              }
              width={1}
              height={1}
              layout="responsive"
              alt="profile-image"
            />
          </div>

          <label
            htmlFor="image"
            className={`mx-auto ${lengthImage > 0 ? "mb-3" : "mb-4"}`}
          >
            <input
              type="file"
              name="image"
              id="image"
              className="hidden w-full h-full"
              onChange={handleInputImage}
            />
            <div className="flex gap-x-2 items-center text-[#7A7886]">
              <Icon icon={"prime:pencil"} className={"text-lg"} />
              <p>Edit</p>
            </div>
          </label>

          {lengthImage > 0 ? (
            <button
              className="bg-primary text-white w-fit mx-auto py-2 px-5 rounded-lg text-sm mb-4"
              onClick={handleUpdateImage}
            >
              {user.isLoading ? (
                <div role="status">
                  <svg
                    className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
          ) : (
            ""
          )}

          <h3 className="text-[#4D4B57] font-semibold text-2xl mb-3">
            {userData.firstName + " " + userData.lastName}
          </h3>

          <p className="text-[#7A7886] mb-12">
            {userData.noTelp ? userData.noTelp : "Phone Not Set"}
          </p>

          <div className="grid gap-y-5">
            <ListProfile content={"Personal Information"} />
            <ListProfile content={"Change Password"} />
            <ListProfile content={"Change PIN"} />
            <ListProfile content={"Logout"} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
