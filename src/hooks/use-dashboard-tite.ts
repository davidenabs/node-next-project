import { useAppStore } from "@/stores/app";
import React from "react";

const useDashboardTitle = (title: string) => {
  const setDashboardTitle = useAppStore((state) => state.setDashboardTitle);

  React.useEffect(() => {
    setDashboardTitle(title);
    return () => setDashboardTitle("");
  }, [title]);
};

export default useDashboardTitle;
