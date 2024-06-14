import AppStats from "components/appStats";
import Layout from "layout";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetTransactions, useUpdateTransaction } from "utils/api/user.api";
import { type UserTransaction } from "utils/types/user.type";

export default function PendingTransactions() {
  const [searchValue, setSearchValue] = useState("");
  const { data: pendingTrans, isLoading } = useGetTransactions(
    "Pending",
    "Withdraw Fiat"
  );
  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <AppStats />
          <ul className="flex flex-wrap items-center gap-3 mb-4">
            <li>
              <NavLink to="/" className="text-black-900 text-xl">
                Pending Withdrawals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transaction-history"
                className="text-black-900/20 text-xl"
              >
                Transaction History
              </NavLink>
            </li>
          </ul>
          {/* <form action="#" className="flex items-center gap-6 mb-8"> */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by date, email address or transaction type"
            className="w-full text-black-700 text-sm rounded-lg border border-black-800 focus:outline-0 py-3.5 px-5"
          />
          {/* <button className="hover:bg-cyan-800 bg-cyan-300 border border-cyan-300 rounded-lg text-black-700 text-base font-bold transition px-8 lg:px-16 py-3">
              Search
            </button>
          </form> */}

          <div className="table-wrapper max-h-[38rem] overflow-auto">
            <table className="w-full">
              <tbody>
                {pendingTrans
                  ?.filter((item) => item.user?.email.includes(searchValue))
                  ?.map((item) => <TableRow key={item?.id} row={item} />)}
                {!isLoading &&
                  pendingTrans?.filter(
                    (item) => item.user?.email.includes(searchValue)
                  )?.length === 0 && (
                    <tr>
                      <td>No Results Found</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TableRow({ row }: { row: UserTransaction }) {
  const [isReview, setReview] = useState(false);
  const { mutate: updateTransaction, isLoading } = useUpdateTransaction();
  return (
    <tr>
      <td className="border-l border-y border-black-800/30 rounded-l-lg py-5 px-2">
        <p className="text-black-900 text-xs ml-3">
          {new Date(row?.createdAt).toLocaleDateString("us", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </td>
      <td className="border-y border-black-800/30 py-5 px-2">
        <p className="text-black-900 text-xs font-semibold">
          <b>{row?.type === "Withdraw Fiat" && "Withdraw to bank"}</b> from{" "}
          {row?.user?.email}
        </p>
        {isReview && (
          <div className=" mt-4">
            <p className="text-black-900 text-xs leading-relaxed font-semibold">
              User bank account:
            </p>
            <p className="text-black-900 text-xs leading-relaxed">
              {row?.accountNumber}
            </p>
            <p className="text-black-900 text-xs leading-relaxed">
              {row?.bankName}
            </p>
            <Link
              to={`/users?search=${row?.user?.email}`}
              className="text-black-900 text-xs leading-relaxed font-semibold"
            >
              Check user in directory
            </Link>
          </div>
        )}
      </td>
      <td className="border-y border-black-800/30 py-5 px-2">
        <p className="text-black-900 text-sm text-center">
          {row?.currency?.symbol}
          {row?.amount}
        </p>
      </td>
      <td
        className={`border-y border-black-800/30 py-2 ${
          isReview ? "align-bottom" : ""
        }`}
      >
        <button
          type="button"
          onClick={() =>
            updateTransaction({ transactionId: row?.id, status: "Rejected" })
          }
          className="hover:bg-black-800 hover:text-white text-black-900 text-xs rounded-lg px-5 py-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div
              className="w-5 h-5 rounded-full animate-spin mx-auto
              border-2 border-solid border-cyan-800 border-t-transparent"
            ></div>
          ) : (
            "Reject"
          )}
        </button>
      </td>
      <td
        className={`border-r border-y border-black-800/30 rounded-r-lg py-2 ${
          isReview ? "align-bottom" : ""
        }`}
      >
        {isReview ? (
          <button
            onClick={() =>
              updateTransaction({ transactionId: row?.id, status: "Completed" })
            }
            type="button"
            className="bg-black-800 text-white text-xs font-semibold rounded-lg px-5 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                className="w-5 h-5 rounded-full animate-spin mx-auto
                border-2 border-solid border-white border-t-transparent"
              ></div>
            ) : (
              "Approve"
            )}
          </button>
        ) : (
          <button
            onClick={() => setReview(!isReview)}
            type="button"
            className="bg-black-800 text-white text-xs font-semibold rounded-lg px-5 py-2"
          >
            Review
          </button>
        )}
      </td>
    </tr>
  );
}
