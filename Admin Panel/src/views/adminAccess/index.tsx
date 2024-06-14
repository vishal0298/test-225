import Layout from "layout";
import React, { useEffect, useState } from "react";
import { useGetUserList, useUpdateUser } from "utils/api/user.api";
import { type User } from "utils/types/user.type";
import toast from "react-hot-toast";
import avatar from "assets/images/avatar.png";
export default function AdminAccess() {
  const { data } = useGetUserList(false);
  console.log(data);
  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <ul className="flex flex-wrap items-center gap-3 mb-4">
            <li>
              <p className="text-black-900 text-xl"> Admin Management</p>
            </li>
          </ul>
          <form action="#" className="flex items-center gap-6 mb-8">
            <input
              type="text"
              placeholder="Search users by name, or email address"
              className="w-full text-black-700 text-sm rounded-lg border border-black-800 focus:outline-0 py-3.5 px-5"
            />
            <button className="hover:bg-cyan-800 bg-cyan-300 border border-cyan-300 rounded-lg text-black-700 text-base font-bold transition px-8 lg:px-16 py-3">
              Search
            </button>
          </form>

          <div className="table-wrapper max-h-[48rem] overflow-auto">
            <table className="w-full">
              <tbody>
                {data?.map((item) => <TableRow key={item?.id} user={item} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TableRow({ user }: { user: User }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState(Boolean(user?.isActive));

  const { mutate: updateUser, isLoading, isSuccess } = useUpdateUser();

  const handleUpdateUser = (value: string) => setIsActive(value === "active");

  useEffect(() => {
    if (isSuccess) {
      setIsEdit(!isEdit);
      toast.success("User updated successfully!");
    }
  }, [isSuccess]);

  return (
    <>
      {/* className={`w-full rounded-lg px-2 ${
            isEdit ? "bg-cyan-300" : "bg-black-300"
          }`} */}
      <tr className="bg-black-300">
        <td className="py-3 px-5 rounded-l-lg">
          <div className="flex items-start">
            {isEdit && (
              <img
                className="w-12 h-12 object-cover rounded-full mr-3"
                src={user?.image || avatar}
                alt="title"
              />
            )}
            <p className="text-black-900 text-xs">
              Created
              <br />
              {new Date(user?.createdAt).toLocaleDateString("us", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </td>
        <td className="py-3 px-2">
          <p className="text-black-900 text-xs">{user?.fullname}</p>
        </td>
        <td className="py-3 px-2">
          <p className="text-black-900 text-xs font-medium underline">
            {user?.email}
          </p>
        </td>
        <td className="py-3 px-2">
          <p className="text-black-900 text-xs">{user?.phone}</p>
        </td>
        <td className="py-3 px-2">
          <p className="text-black-900 text-xs">
            {user?.accountNumber}
            <br />
            {user?.accountName}
          </p>
        </td>
        <td className="py-3 px-2 rounded-r-lg">
          {!isEdit && (
            <>
              <span className="text-black-900 text-xs block">{user?.role}</span>
              <button
                className="italic text-black-900 text-xs"
                onClick={() => setIsEdit(!isEdit)}
              >
                change role?
              </button>
            </>
          )}
        </td>
      </tr>
      {isEdit && (
        <tr
          className={`bg-black-300 ${
            isEdit
              ? " relative after:absolute after:bg-black-300 bg- after:left-0 after:bottom-[100%] after:block after:w-[100%] after:h-[18px]"
              : ""
          }`}
        >
          <td colSpan={6} className="px-6 pb-6 rounded-b-lg">
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
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="ml-auto mr-2 hover:bg-black-300 text-xs font-bold px-8 py-2"
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
          </td>
        </tr>
      )}
    </>
  );
}
