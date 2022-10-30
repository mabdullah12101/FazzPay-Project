import React from "react";
import Layout from "layout";
import History from "components/card/History";
import { Icon } from "@iconify/react";
import Cookies from "next-cookies"; // digunakan untuk kebutuhan mengambil data untuk server side
import axiosServer from "utils/axiosServer";
import qs from "query-string";
import { useRouter } from "next/router";

export default function TransactionHistory(props) {
  const router = useRouter();

  const navigateSearch = (data) => {
    let query = { ...props.params, ...data };
    if (query.page === 1) {
      delete query.page;
    }
    if (Object.keys(query).length > 0) {
      query = qs.stringify(query);
      router.push(`/home/transaction-history?${query}`);
    } else {
      router.push("/home/transaction-history");
    }
  };

  const onChangeFilter = (e) => {
    navigateSearch({ page: 1, filter: e.target.value });
  };

  const handlePrevPage = () => {
    navigateSearch({ page: props?.params?.page - 1 });
  };

  const handleNextPage = () => {
    navigateSearch({ page: props?.params?.page + 1 });
  };

  return (
    <div>
      <Layout title="Transaction History" page={"Dashboard"}>
        <div className="bg-white rounded-3xl shadow-lg px-7 py-7">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-dark font-semibold">
              Transaction History
            </h2>

            <select
              name="filter"
              className="bg-[#3A3D421A] text-black text-[13px] rounded-xl focus:outline-none py-3 px-7"
              value={props.params.filter}
              onChange={onChangeFilter}
            >
              <option value="WEEK">Week</option>
              <option value="MONTH">Month</option>
              <option value="YEAR">Year</option>
            </select>
          </div>

          <div className="grid gap-y-12 mt-9">
            {props.data.map((item) => (
              <div key={item.id}>
                <History data={item} />
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
  let params = context.query;
  params.page = params.page ? +params.page : 1;
  params.filter = params.filter ? params.filter : "MONTH";
  const result = await axiosServer.get(
    `transaction/history?page=${params.page}&limit=5&filter=${params.filter}`,
    {
      headers: {
        Authorization: `Bearer ${dataCookies.token}`,
      },
    }
  );
  return {
    props: {
      data: result.data.status === 200 ? result.data.data : [],
      pagination: result.data.status === 200 ? result.data.pagination : {},
      params: params,
    }, // will be passed to the page component as props
  };
}
