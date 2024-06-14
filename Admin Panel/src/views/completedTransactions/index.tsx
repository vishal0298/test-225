import AppStats from "components/appStats";
import Layout from "layout";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetTransactions } from "utils/api/user.api";
import { type UserTransaction } from "utils/types/user.type";

export default function CompletedTransactions() {
  const [searchValue, setSearchValue] = useState("");
  const { data: completedTrans, isLoading } = useGetTransactions("Completed");
  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <AppStats />
          <ul className="flex flex-wrap items-center gap-3 mb-4">
            <li>
              <NavLink
                to="/pending-withdrawals"
                className="text-black-900/20 aria-[current=page]:text-black-900 text-xl"
              >
                Pending Withdrawals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transaction-history"
                className="text-black-900/20 aria-[current=page]:text-black-900 text-xl"
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
                {completedTrans
                  ?.filter((item) => item.user?.email.includes(searchValue))
                  ?.map((transaction) => (
                    <TableRow key={transaction?.id} transaction={transaction} />
                  ))}
                {!isLoading &&
                  completedTrans?.filter(
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

function TableRow({ transaction }: { transaction: UserTransaction }) {
  const [isEdit, setIsEdit] = useState(false);
  console.log("transaction", transaction);
  return (
    <>
      <tr
        className={` ${
          transaction?.type === "Withdraw"
            ? "bg-[#FFDEEA]"
            : transaction?.type === "Withdraw Fiat"
            ? "bg-white"
            : transaction?.type.includes("Swap")
            ? "bg-[#F3F3F3]"
            : "bg-cyan-300"
        }`}
      >
        <td className="rounded-l-lg px-2 border border-black-800/30 border-r-0 py-5">
          <p className="text-black-900 text-xs ml-3">
            {new Date(transaction?.createdAt).toLocaleDateString("us", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </td>
        <td className="py-5 px-2 border-y border-black-800/30">
          <p className="text-black-900 text-xs font-semibold">
            <b>
              {transaction?.type === "Withdraw Fiat"
                ? "Withdrawal to bank"
                : transaction?.type === "Withdraw"
                ? "Withdrawal"
                : transaction?.type.includes("Swap")
                ? transaction?.currency?.name?.concat(" Swap")
                : transaction?.type}
            </b>{" "}
            from {transaction?.user?.email}
          </p>
        </td>
        <td className="py-5 px-2 border-y border-black-800/30">
          <p className="text-black-900 text-sm text-center">
            {transaction?.type.includes("Withdraw Fiat") &&
              transaction?.currency?.symbol}
            {transaction?.amount} {transaction?.coin?.symbol}
          </p>
        </td>
        <td className="rounded-r-lg px-2 border border-black-800/30 border-l-0 py-5">
          <button
            onClick={() => setIsEdit(!isEdit)}
            type="button"
            className={`${
              transaction?.type === "Withdraw"
                ? "bg-[#FF689F] text-white"
                : transaction?.type === "Withdraw Fiat"
                ? "bg-black-800 text-white"
                : transaction?.type === "Swap"
                ? "bg-[#D4D4D4] text-black"
                : "bg-cyan-800 text-black"
            } text-xs font-semibold rounded-lg px-5 py-2`}
          >
            {isEdit ? "Collapse" : "See Details"}
          </button>
        </td>
      </tr>
      <tr
        className={`${
          transaction?.type === "Withdraw"
            ? "bg-[#FFDEEA] after:bg-[#FFDEEA]"
            : transaction?.type === "Withdraw Fiat"
            ? "bg-white after:bg-white"
            : transaction?.type.includes("Swap")
            ? "bg-[#F3F3F3] after:bg-[#F3F3F3]"
            : "bg-cyan-300 after:bg-cyan-300"
        } ${
          isEdit
            ? "relative after:absolute after:border-x after:border-black-800/30 after:left-0 after:bottom-[100%] after:block after:w-[100%] after:h-[18px]"
            : ""
        }
        
        `}
      >
        <td
          colSpan={6}
          className={`p-0 ${
            isEdit ? "border border-black-800/30" : ""
          } rounded-b-lg border-t-0`}
        >
          {isEdit &&
            (transaction?.type === "Withdraw Fiat" ? (
              <table className="px-6 pb-6">
                <tr>
                  <td>
                    <strong className="text-xs">Funds sent to</strong>
                    <span className="text-xs mt-3 block">
                      {transaction?.accountNumber}
                    </span>
                    <span className="text-xs mt-3 block">
                      {transaction?.bankName}
                    </span>
                  </td>
                  <td valign="top">
                    <strong className="text-xs">User Remaining Balance</strong>
                    <span className="text-xs mt-3 block">
                      {transaction?.currency?.symbol}{" "}
                      {new Intl.NumberFormat("en", {
                        maximumFractionDigits: 4,
                      }).format(transaction?.balance)}
                    </span>
                  </td>
                  <td valign="top">
                    <strong className="text-xs">User bank Details</strong>
                    <span className="text-xs mt-3 block">
                      {transaction?.user?.accountNumber}
                    </span>
                    <span className="text-xs mt-3 block">
                      {transaction?.user?.accountName}
                    </span>
                  </td>
                  <td valign="top">
                    <Link
                      to={`/users?search=${transaction?.user?.email}`}
                      className="text-black-900 text-xs leading-relaxed font-semibold"
                    >
                      Check user in directory
                    </Link>
                  </td>
                </tr>
              </table>
            ) : (
              <table className="px-6 pb-6 w-full">
                <tr>
                  <td>
                    <strong className="text-xs">Transaction details</strong>
                    <strong className="text-xs block mt-3">
                      {transaction?.type === "Withdraw"
                        ? "Sent to wallet address:"
                        : "Incoming wallet address:"}
                    </strong>
                    <span className="text-xs mt-3 block">
                      {transaction?.fromAddress}
                    </span>
                  </td>
                  <td valign="top">
                    <strong className="text-xs">User wallet address:</strong>
                    <span className="text-xs mt-3 block">
                      {transaction?.toAddress}
                    </span>
                  </td>
                  {transaction?.type === "Swap" ? (
                    <td valign="top">
                      <strong className="text-xs">Swapped Amount</strong>
                      <span className="text-xs mt-3 block">
                        {transaction?.currency?.symbol}{" "}
                        {transaction?.swappedAmount}
                      </span>
                    </td>
                  ) : transaction?.type === "Withdraw" ? (
                    ""
                  ) : (
                    <td valign="top">
                      <strong className="text-xs">User balance</strong>
                      <span className="text-xs mt-3 block">
                        <img
                          src={transaction?.coin?.icon}
                          className="w-4 h-4 inline mr-1"
                        />{" "}
                        {transaction?.balance}
                      </span>
                    </td>
                  )}
                  <td valign="top">
                    <span className="text-black-900 text-xs font-semibold mb-3 block">
                      Network: {transaction?.coin?.name}
                    </span>
                    <Link
                      to={`/users?search=${transaction?.user?.email}`}
                      className="text-black-900 text-xs leading-relaxed font-semibold"
                    >
                      Check user in directory
                    </Link>
                  </td>
                </tr>
              </table>
            ))}
        </td>
      </tr>
    </>
  );
}
