"use client";
import Navbar from "@/components/home/navbar";
import React from "react";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
