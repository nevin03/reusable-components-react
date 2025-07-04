import React from "react";
import StepperModal from "./StepperModal";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-secondary-100 to-tertiary-100 px-4 py-12">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-8 transform transition-all hover:shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-tertiary-400 opacity-20 blur-sm" />
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-tertiary-600">
            Welcome to User Management
          </h1>
          <p className="mt-4 text-lg text-secondary-600">
            Easily add new users with a single click. Start building your
            community today!
          </p>
          <div className="mt-8">
            <StepperModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
