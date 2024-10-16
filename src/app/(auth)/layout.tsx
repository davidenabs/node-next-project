import AuthLayout from "@/layouts/auth";
import React from "react";

export default function MainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>{children}</AuthLayout>
  );
}
