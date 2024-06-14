import React from "react";
import { useGetStats } from "utils/api/user.api";

export default function AppStats() {
  const { data } = useGetStats();
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-8 mt-4 mb-12">
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="hover:bg-cyan-800 bg-cyan-300 rounded-2xl transition p-6">
          <p className="text-black-800 text-sm font-semibold mb-3">
            Total Withdrawals
          </p>
          <h4 className="text-black-800 text-2xl font-semibold">
            {data?.withdrawsFiat}
          </h4>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="hover:bg-cyan-800 bg-cyan-300 rounded-2xl transition p-6">
          <p className="text-black-800 text-sm font-semibold mb-3">
            Total Users
          </p>
          <h4 className="text-black-800 text-2xl font-semibold">
            {data?.totalUsers}
          </h4>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="hover:bg-cyan-800 bg-cyan-300 rounded-2xl transition p-6">
          <p className="text-black-800 text-sm font-semibold mb-3">New Users</p>
          <h4 className="text-black-800 text-2xl font-semibold">
            {data?.newUsers}
          </h4>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="hover:bg-cyan-800 bg-cyan-300 rounded-2xl transition p-6">
          <p className="text-black-800 text-sm font-semibold mb-3">
            Active Users
          </p>
          <h4 className="text-black-800 text-2xl font-semibold">
            {data?.activeUsers}
          </h4>
        </div>
      </div>
    </div>
  );
}
