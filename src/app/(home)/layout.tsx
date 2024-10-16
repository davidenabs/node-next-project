"use client";
import AppLayout from "@/layouts/app";
import React from "react";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppLayout>{children}</AppLayout>
  );
};

export default HomeLayout;
