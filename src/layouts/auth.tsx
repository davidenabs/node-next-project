import React, { Fragment } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex bg-red-800 p-12 min-h-screen justify-center">
      <div className="flex flex-col items-center ">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
