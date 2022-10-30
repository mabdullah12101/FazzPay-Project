/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Layout from "layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById } from "stores/action/user";
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
    //   legend: {
    //     position: 'top' as const,
    //   },
    title: {
      display: false,
      text: "dashboard",
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Income",
//       data: [20, 35, 10, 5, 0, 10, 20],
//       backgroundColor: "#1EC15F",
//     },
//     {
//       label: "Expense",
//       data: [20, 35, 10, 5, 0, 10, 20],
//       backgroundColor: "#FF5B37",
//     },
//   ],
// };

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

  // const isLogin = Cookies.get("token");

  // if (!isLogin) {
  //   router.push("/login");
  // }

  return (
    // <div className={`${isLogin ? "" : "hidden"}`}>
    <Layout title="Home" page={"Dashboard"}>
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
            {/* <History />
            <History />
            <History /> */}
          </div>
        </div>
      </div>
    </Layout>
    // </div>
  );
}
