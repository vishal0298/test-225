import React, { useEffect, useState } from "react";
import Layout from "layout";
import { useSetFee, useGetFee } from "utils/api/user.api";
import toast from "react-hot-toast";
import SwapIcon from "../../assets/images/swap.svg";
import WithdrawIcon from "../../assets/images/withdrawal.svg";

export default function RateSettings() {
  const [state, setState] = useState<any>({
    feeName: "",
    feePercentage: 0,
  });
  const [withdrawState, setWithdrawState] = useState<any>({
    feeName: "",
    feePercentage: 0,
  });
  const { data } = useGetFee();
  const { mutate: setFee, isLoading, isSuccess } = useSetFee();

  const getFee = (name: string) => {
    const response = data?.find((item: any) => item.feeName === name);
    if (response) {
      return response?.feePercentage;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Price updated successfully!");
    }
  }, [isSuccess]);

  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <h1 className="text-xl font-bold">Earning Fee</h1>
          <div
            className={`bg-cyan-300 rounded-lg flex items-center p-5  gap-4 mt-10`}
          >
            <p className="text-lg font-bold basis-5/12 flex items-center gap-4">
              <img src={SwapIcon} className="w-10 h-10" />
              Swap Fee Percentage
            </p>
            {/* <div className="basis-2/12 text-right">
              <span className="block text-xs">Previous Fee</span>
              <span className="font-bold text-[16px]">$0.00</span>
            </div> */}
            <div className="basis-2/12 text-right">
              <span className="block text-xs ">Fee Percentage</span>
              <span className="font-bold text-[16px]">
                {getFee("swap_fee")}%
              </span>
            </div>
            <input
              onChange={(e) =>
                setState({ feeName: "swap_fee", feePercentage: e.target.value })
              }
              value={state.feePercentage}
              disabled={isLoading}
              type="number"
              placeholder="Enter new fee"
              className="block basis-2/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              onClick={() => {
                setFee(state);
                setState({
                  feeName: "",
                  feePercentage: 0,
                });
              }}
              className="bg-cyan-800 basis-1/12 border border-cyan-300 rounded-md text-black-700 text-md font-bold transition px-8 py-2 sm:text-sm"
            >
              {isLoading ? (
                <div
                  className="w-5 h-5 rounded-full animate-spin mx-auto
                      border-2 border-solid border-black-800 border-t-transparent"
                ></div>
              ) : (
                "Update"
              )}
            </button>
          </div>
          <div
            className={`bg-cyan-300 rounded-lg flex items-center p-5  gap-4 mt-10`}
          >
            <p className="text-lg font-bold basis-5/12 flex items-center gap-4">
              <img src={WithdrawIcon} className="w-10 h-10" />
              Withdraw Fiat Fee Percentage
            </p>
            {/* <div className="basis-2/12 text-right">
              <span className="block text-xs">Previous Fee</span>
              <span className="font-bold text-[16px]">$0.00</span>
            </div> */}
            <div className="basis-2/12 text-right">
              <span className="block text-xs ">Fee Percentage</span>
              <span className="font-bold text-[16px]">
                {getFee("withdraw_fiat_fee")}%
              </span>
            </div>
            <input
              onChange={(e) =>
                setWithdrawState({
                  feeName: "withdraw_fiat_fee",
                  feePercentage: e.target.value,
                })
              }
              value={withdrawState.feePercentage}
              disabled={isLoading}
              type="number"
              placeholder="Enter new fee"
              className="block basis-2/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              onClick={() => {
                setFee(withdrawState);
                setWithdrawState({
                  feeName: "",
                  feePercentage: 0,
                });
              }}
              className="bg-cyan-800 basis-1/12 border border-cyan-300 rounded-md text-black-700 text-md font-bold transition px-8 py-2 sm:text-sm"
            >
              {isLoading ? (
                <div
                  className="w-5 h-5 rounded-full animate-spin mx-auto
                      border-2 border-solid border-black-800 border-t-transparent"
                ></div>
              ) : (
                "Update"
              )}
            </button>
          </div>
          {/* {data?.map((item, i) => (
            <div
              key={item?.id}
              className={`bg-cyan-300 rounded-lg flex items-center p-5  gap-4 ${
                i === 0 ? "mt-10" : "mt-5"
              }`}
            >
              <p className="text-lg font-bold basis-5/12 flex items-center gap-4">
                <img src={item?.icon} className="w-10 h-10" /> {item?.symbol}
                /NGN
              </p>
              <div className="basis-2/12 text-right">
                <span className="block text-xs">Former Fee</span>
                <span className="font-bold text-[16px]">
                  ₦{" "}
                  {new Intl.NumberFormat("en", {
                    maximumFractionDigits: 4,
                  }).format(item?.priceFormer)}
                </span>
              </div>
              <div className="basis-2/12 text-right">
                <span className="block text-xs ">Current Fee</span>
                <span className="font-bold text-[16px]">
                  ₦{" "}
                  {new Intl.NumberFormat("en", {
                    maximumFractionDigits: 4,
                  }).format(item?.price)}
                </span>
              </div>
              <input
                onChange={(e) =>
                  setState({ ...state, [`coin${i}`]: e.target.value })
                }
                value={state[`coin${i}`]}
                disabled={isLoading}
                type="number"
                placeholder="Enter new fee"
                className="block basis-2/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                onClick={() => {
                  if (state[`coin${i}`]) {
                    updatePrice({ price: state[`coin${i}`], coinId: item?.id });
                    setState({ ...state, [`coin${i}`]: "" });
                  }
                }}
                className="bg-cyan-800 basis-1/12 border border-cyan-300 rounded-md text-black-700 text-md font-bold transition px-8 py-2 sm:text-sm"
              >
                {isLoading ? (
                  <div
                    className="w-5 h-5 rounded-full animate-spin mx-auto
                      border-2 border-solid border-black-800 border-t-transparent"
                  ></div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </Layout>
  );
}
