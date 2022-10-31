import React from "react";
import Layout from "layout";
import Cookies from "next-cookies"; // digunakan untuk kebutuhan mengambil data untuk server side
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import CardPeople from "components/card/People";
import axiosServer from "utils/axiosServer";
import qs from "query-string";
import { useState } from "react";

export default function Transfer(props) {
  const router = useRouter();
  const isLogin = true;
  const [search, setSearch] = useState({ sort: props.params.sort });

  const navigateSearch = (data) => {
    let query = { ...props.params, ...data };
    if (query.page === 1) {
      delete query.page;
    }
    if (query.search === "") {
      delete query.search;
    }
    if (Object.keys(query).length > 0) {
      query = qs.stringify(query);
      router.push(`/transfer?${query}`);
    } else {
      router.push("/transfer");
    }
  };

  const handlePrevPage = () => {
    navigateSearch({ page: props?.params?.page - 1 });
  };

  const handleNextPage = () => {
    navigateSearch({ page: props?.params?.page + 1 });
  };

  const handleChangeSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigateSearch({ page: 1, search: search.search, sort: search.sort });
  };

  return (
    <div className={`${isLogin ? "" : "hidden"}`}>
      <Layout title="Transfer" page={"Transfer"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <h2 className="text-lg text-dark font-semibold mb-6">
            Search Receiver
          </h2>

          <form
            className="mb-10 flex items-center gap-x-5"
            onSubmit={handleSearch}
          >
            <div className="relative w-full">
              <Icon
                icon={"bx:search"}
                className="absolute text-[#A9A9A9] text-2xl top-0 bottom-0 left-3 my-auto"
              />
              <input
                type="text"
                className="w-full rounded-xl bg-[#3A3D421A] placeholder:text-[#3A3D4266] px-12 py-3 focus:outline-blue-500 focus:ring-blue-500 focus:bg-white"
                placeholder="Search receiver here"
                name="search"
                onChange={handleChangeSearch}
              />
            </div>
            <select
              name="sort"
              value={search.sort}
              onChange={handleChangeSearch}
            >
              <option value="firstName ASC">ASC</option>
              <option value="firstName DESC">DESC</option>
            </select>
          </form>

          <div className="grid gap-y-7 pr-3">
            {props.listUser.map((item) => (
              <div key={item.id}>
                <CardPeople data={item} navigate={true} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14 gap-x-4">
            <button
              className={`bg-primary text-white rounded-lg py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handlePrevPage}
              disabled={props.params.page === 1 ? true : false}
            >
              <Icon icon={"akar-icons:arrow-left"} className={`text-3xl`} />
            </button>
            <button
              className="bg-primary text-white rounded-lg py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={
                props.params.page === props.pagination.totalPage ? true : false
              }
            >
              <Icon icon={"akar-icons:arrow-right"} className={`text-3xl`} />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const dataCookies = Cookies(context);
  if (!dataCookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let params = context.query;
  params.page = params.page ? +params.page : 1;
  params.sort = params.sort ? params.sort : "firstName ASC";
  params.search = params.search ? params.search : "";
  const result = await axiosServer.get(
    `/user?page=${params.page}&limit=3&search=${params.search}&sort=${params.sort}`,
    {
      headers: {
        Authorization: `Bearer ${dataCookies.token}`,
      },
    }
  );
  return {
    props: {
      listUser: result.data.status === 200 ? result.data.data : [],
      pagination: result.data.status === 200 ? result.data.pagination : {},
      params: params,
    }, // will be passed to the page component as props
  };
}
