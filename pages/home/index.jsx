/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Layout from "layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import History from "components/card/History";
import { modal } from "stores/action/topUp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: "dashboard",
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const dashboardData = dashboard.data;
  const user = useSelector((state) => state.user);
  const dataUser = user.data;
  const history = useSelector((state) => state.history);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getIncomeData();
    getExpenseData();
  }, []);

  const getIncomeData = () => {
    const fixData = [];
    dashboardData.listIncome.map((item) => {
      fixData.push(item.total);
    });
    setIncomeData(fixData);
  };

  const getExpenseData = () => {
    const fixData = [];
    dashboardData.listExpense.map((item) => {
      fixData.push(item.total);
    });
    setExpenseData(fixData);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#1EC15F",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#FF5B37",
      },
    ],
  };

  return (
    <Layout title="Home" page={"Dashboard"}>
      {user.isLoading || dashboard.isLoading || history.isLoading ? (
        <div className="h-[550px] flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-primary flex justify-between p-7 rounded-lg">
            <div>
              <p className="text-[#E0E0E0] text-lg mb-2">Balance</p>
              <p className="font-semibold text-4xl text-white mb-4">
                {`Rp${Number(dataUser.balance).toLocaleString()}`}
              </p>
              <p className="text-[#DFDCDC] text-sm">{dataUser.noTelp}</p>
            </div>
            <div className="grid gap-y-3">
              <button
                className="flex items-center gap-x-2 bg-[#FFFFFF33] border border-white rounded-lg px-7 py-4"
                onClick={() => router.push("/transfer")}
              >
                <Icon
                  icon={"akar-icons:arrow-up"}
                  className="text-[#B5B0ED] text-2xl"
                />
                <p className="text-white font-semibold text-lg">Transfer</p>
              </button>
              <button
                className="flex items-center gap-x-2 bg-[#FFFFFF33] border border-white rounded-lg px-7 py-4"
                onClick={() => dispatch(modal(true))}
              >
                <Icon
                  icon={"akar-icons:plus"}
                  className="text-[#B5B0ED] text-2xl"
                />
                <p className="text-white font-semibold text-lg">Top Up</p>
              </button>
            </div>
          </div>

          <div className="flex mt-5 gap-x-5">
            <div className="basis-[55%] bg-white rounded-3xl p-7">
              <div className="flex justify-between items-center">
                <div>
                  <Icon
                    icon={"akar-icons:arrow-down"}
                    className="text-[#1EC15F] text-2xl mb-4"
                  />
                  <p className="text-[#6A6A6A] text-sm mb-2">Income</p>
                  <p className="text-dark text-lg font-semibold mb-16">
                    {`Rp${Number(dashboardData.totalIncome).toLocaleString()}`}
                  </p>
                </div>
                <div>
                  <Icon
                    icon={"akar-icons:arrow-up"}
                    className="text-error text-2xl mb-4"
                  />
                  <p className="text-[#6A6A6A] text-sm mb-2">Expense</p>
                  <p className="text-dark text-lg font-semibold mb-16">
                    {`Rp${Number(dashboardData.totalExpense).toLocaleString()}`}
                  </p>
                </div>
              </div>
              <Bar options={options} data={chartData} />
            </div>

            <div className="basis-[45%] bg-white rounded-3xl p-7">
              <div className="flex justify-between items-center">
                <p className="text-dark font-semibold text-lg">
                  Transaction History
                </p>
                <button
                  className="text-primary text-sm font-medium"
                  onClick={() => router.push("/home/transaction-history")}
                >
                  See all
                </button>
              </div>

              <div className="mt-10 grid gap-y-10">
                {history.data.map((item) => (
                  <div key={item.id}>
                    <History data={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
