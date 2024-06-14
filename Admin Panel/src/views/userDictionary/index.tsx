import Layout from "layout";
import React, { useEffect, useState } from "react";
import {
  useGetUserList,
  useGetUserWalletBalance,
  useUpdateUser,
} from "utils/api/user.api";
import { type ListedUser } from "utils/types/user.type";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import avatar from "assets/images/avatar.png";

export default function UserDictionary() {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );

  const { data, isLoading } = useGetUserList();
  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <ul className="flex flex-wrap items-center gap-3 mb-4">
            <li>
              <p className="text-black-900 text-xl">User Directory</p>
            </li>
          </ul>
          {/* <form action="#" className="flex items-center gap-6 mb-8"> */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="obasaolorunfemi@gmail.com"
            className="w-full text-black-700 text-sm rounded-lg border border-black-800 focus:outline-0 py-3.5 px-5"
          />
          {/* <button className="hover:bg-cyan-800 bg-cyan-300 border border-cyan-300 rounded-lg text-black-700 text-base font-bold transition px-8 lg:px-16 py-3">
              Search
            </button>
          </form> */}

          <div className="table-wrapper max-h-[48rem] overflow-auto">
            <table className="w-full">
              <tbody>
                {data
                  ?.filter((item) => item.email.includes(searchValue))
                  ?.map((item) => <TableRow key={item?.id} user={item} />)}
                {!isLoading &&
                  data?.filter((item) => item.email.includes(searchValue))
                    ?.length === 0 && (
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

function TableRow({ user }: { user: ListedUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState(Boolean(user?.isActive));

  const { mutate: updateUser, isLoading, isSuccess } = useUpdateUser();
  const { data: userWallet } = useGetUserWalletBalance(user?.id);

  const handleUpdateUser = (value: string) => setIsActive(value === "active");

  useEffect(() => {
    if (isSuccess) {
      setIsEdit(!isEdit);
      toast.success("User updated successfully!");
    }
  }, [isSuccess]);

  return (
    <>
      {/* <tr>
        <table
          className={`w-full rounded-lg px-2 ${
            isEdit ? "bg-cyan-300" : "bg-black-300"
          }`}
        >
         
        </table>
      </tr> */}
      <tr
        className={`px-2 ${
          user?.role === "User" ? "bg-cyan-300" : "bg-black-300"
        }`}
      >
        <td className="py-5 px-5 rounded-l-lg">
          <div className="flex w-[max-content]">
            {isEdit && (
              <img
                className="w-12 h-12 object-cover rounded-full mr-3"
                src={user?.image || avatar}
                alt="title"
              />
            )}
            <span className="text-black-900 text-xs">
              Created
              <br />
              {new Date(user?.createdAt).toLocaleDateString("us", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </td>
        <td className="py-5 px-2">
          <p className="text-black-900 text-xs">{user?.fullname}</p>
        </td>
        <td className="py-5 px-2">
          <p className="text-black-900 text-xs font-medium underline">
            {user?.email}
          </p>
        </td>
        <td className="py-5 px-2">
          <p className="text-black-900 text-xs">{user?.phone}</p>
        </td>
        <td className="py-5 px-2">
          <p className="text-black-900 text-xs">
            {user?.accountNumber}
            <br />
            {user?.accountName}
          </p>
        </td>
        <td className="py-5 px-5 rounded-r-lg w-[100px]">
          {!isEdit && (
            <>
              <span className="text-black-900 text-xs block">{user?.role}</span>
              <button
                className="italic text-black-900 text-xs"
                onClick={() => setIsEdit(!isEdit)}
              >
                edit user?
              </button>
            </>
          )}
        </td>
      </tr>
      <tr
        className={`${user?.role === "User" ? "bg-cyan-300" : "bg-black-300"} ${
          user?.role === "User" ? "after:bg-cyan-300" : "after:bg-black-300"
        } ${
          isEdit
            ? "relative after:absolute after:left-0 after:bottom-[100%]  after:block after:w-[100%] after:h-[16px]"
            : ""
        }`}
      >
        <td colSpan={6} className="p-0 rounded-b-lg">
          {isEdit && (
            <div className="pb-6 px-6">
              <h4 className="text-xl">Wallet balances</h4>
              <div className="flex my-10 flex-wrap gap-10">
                {userWallet?.balance?.length &&
                  userWallet?.balance?.map((item) => (
                    <div key={item?.id} className="basis-5/12">
                      <h6 className="text-sm font-bold">
                        {item?.symbol} Address
                      </h6>
                      <p className="text-sm">{item?.address}</p>
                      <div className="flex gap-2 mt-2">
                        <img src={item?.logoUrl} className="w-6 h-6" />
                        <span className="font-bold">
                          {new Intl.NumberFormat("en", {
                            maximumFractionDigits: 4,
                          }).format(item?.balance)}{" "}
                          {item?.name}
                        </span>
                      </div>
                    </div>
                  ))}
                <div className="basis-5/12">
                  <h6 className="text-sm font-bold">
                    {userWallet?.wallet?.usdCurrency?.name} Balance
                  </h6>
                  <p className="text-sm mb-2">
                    <span className="font-bold ">Account</span>:
                    {userWallet?.wallet?.accountNumber};{" "}
                    {userWallet?.wallet?.accountName}
                  </p>
                  <span className="font-bold">
                    {userWallet?.wallet?.usdCurrency?.symbol}{" "}
                    {userWallet?.wallet?.totalBalanceInUsd &&
                      new Intl.NumberFormat("en", {
                        maximumFractionDigits: 4,
                      }).format(userWallet?.wallet?.totalBalanceInUsd)}
                  </span>
                </div>
                <div className="basis-5/12">
                  <h6 className="text-sm font-bold">
                    {userWallet?.wallet?.localCurrency?.name} Balance
                  </h6>
                  <p className="text-sm mb-2">
                    <span className="font-bold ">Account</span>:
                    {userWallet?.wallet?.accountNumber};{" "}
                    {userWallet?.wallet?.accountName}
                  </p>
                  <span className="font-bold">
                    {userWallet?.wallet?.localCurrency?.symbol}{" "}
                    {userWallet?.wallet?.totalBalanceInLocalCurrency &&
                      new Intl.NumberFormat("en", {
                        maximumFractionDigits: 4,
                      }).format(
                        userWallet?.wallet?.totalBalanceInLocalCurrency
                      )}
                  </span>
                </div>
              </div>
              <select
                name="select-1"
                id="select-1"
                className="max-w-md w-full border border-black-800/30 px-3 py-1 rounded-lg focus:outline-0 mb-8"
                onChange={(e) => handleUpdateUser(e?.target?.value)}
                defaultValue={user?.isActive ? "active" : "de-active"}
              >
                <option className="bg-black-300" value="active">
                  Activate
                </option>
                <option className="bg-black-300" value="de-active">
                  Deactivate
                </option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="mr-2 hover:bg-black-300 text-xs font-bold px-8 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateUser({ userId: user?.id, isActive })}
                  className="hover:bg-cyan-300 bg-cyan-800 border border-cyan-300 rounded-lg text-black-700 text-xs font-bold transition px-8 py-2"
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
            </div>
          )}
        </td>
      </tr>
    </>
  );
}
