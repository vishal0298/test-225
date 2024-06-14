import React from "react";
import welcomeBack from "assets/images/logback.png";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <section className="login-section">
      <div className="grid lg:grid-cols-12 h-screen gap-3">
        <div className="lg:col-span-6 relative lg:overflow-hidden">
          <div className="login-bg h-full flex items-center justify-center">
            <img
              className="max-w-xs lg:max-w-none object-cover object-right-top"
              src={welcomeBack}
              alt="title"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="login-wrapper w-full max-w-md mx-auto p-6">
            <h5 className="text-center text-black-800 text-3xl font-bold mb-8 xl:mb-16">
              You have been logged out successfully{" "}
            </h5>
            <Link
              to="/login"
              className="block text-center bg-cyan-800 hover:bg-cyan-300 text-black-800 text-xl font-medium border border-cyan-800 rounded-lg w-full p-3.5 transition"
            >
              Log back in?
            </Link>
            <Link
              to="/signup"
              className="block mt-4 text-center bg-cyan-300 text-black-800 text-xl font-medium rounded-lg w-full p-3.5 transition"
            >
              Create an account instead?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
