import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "assets/images/logo.svg";
import closeIcon from "assets/images/close-icon.svg";
import pTransImg from "assets/images/ChartPieSlice-d.svg";
import cTransImg from "assets/images/ShoppingBagOpen-d.svg";
import uDictionary from "assets/images/BookOpen-d.svg";
import { useGetLoggedInUser } from "utils/api/user.api";

export default function Layout({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  const navigate = useNavigate();
  const { data: profile } = useGetLoggedInUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/logout");
  };
  return (
    <main className="dashboard-section">
      <aside className="dashboard-sidebar bg-white border-r border-black-800/20">
        <div className="sidebar-wrapper h-full relative p-6">
          <button className="sidebar-toggler absolute top-3 right-3 block sm:hidden">
            <img src={closeIcon} alt="title" />
          </button>
          <div className="sidebar-top pb-20">
            <div className="flex items-center mb-6">
              <img src={logo} className="mr-2" alt="title" />
            </div>
            <nav>
              {/* <h5 className="text-black-800/40 text-sm mb-2">Favorites</h5>
              <ol className="mb-6">
                <li>
                  <NavLink
                    to="/pending-withdrawals"
                    className="flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                  >
                    Pending Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/transaction-history"
                    className="flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                  >
                    Completed Transactions
                  </NavLink>
                </li>
              </ol> */}
              <h5 className="text-black-800/40 text-sm mb-2">Dashboard</h5>
              <ul className="mb-6">
                <li>
                  <NavLink
                    to="/pending-withdrawals"
                    className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                  >
                    <img className="mr-2" src={pTransImg} alt="title" />
                    Pending Withdrawals
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/transaction-history"
                    className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                  >
                    <img className="mr-2" src={cTransImg} alt="title" />
                    Transaction History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/earning-fee"
                    className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                  >
                    <img className="mr-2" src={cTransImg} alt="title" />
                    Earning Fee
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/users"
                    className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                  >
                    <img className="mr-2" src={uDictionary} alt="title" />
                    Users
                  </NavLink>
                </li>
                {/* <li>
                  <a
                    href="https://tawk.to/chat/64d4cd9694cf5d49dc699794/1h7fk65aa"
                    target="_blank"
                    className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                    rel="noreferrer"
                  >
                    <img className="mr-2" src={stImg} alt="title" />
                    Support - Telegram
                  </a>
                </li> */}
              </ul>
              <h5 className="text-black-800/40 text-sm mb-2">Settings</h5>
              <ul className="mb-6">
                {profile?.isSuperAdmin && (
                  <li>
                    <NavLink
                      to="/admin-management"
                      className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                    >
                      Admin Management
                    </NavLink>
                  </li>
                )}
                {profile?.isAdmin && (
                  <li>
                    <NavLink
                      to="/change-email"
                      className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                    >
                      Change email
                    </NavLink>
                  </li>
                )}
                {profile?.isAdmin && (
                  <li>
                    <NavLink
                      to="/change-password"
                      className="aria-[current=page]:bg-cyan-800/20 aria-[current=page]:font-bold hover:bg-cyan-800/20 rounded-lg flex items-center text-black-800 text-sm hover:font-bold transition p-1 mb-2"
                    >
                      Change password
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <div className="sidebar-bottom w-[15rem] bg-white fixed bottom-0 left-0 right-0 p-6">
            <span
              onClick={handleLogout}
              className="cursor-pointer text-black-800 text-sm font-bold"
            >
              Logout
            </span>
            <p className="text-black-800 text-xs">Dashboard v1.0</p>
          </div>
        </div>
      </aside>
      {children}
    </main>
  );
}
