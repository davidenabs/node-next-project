import { create } from "zustand";

interface AppState {
    openNavDrawer: boolean;
    dashboardTitle: string;
    isSidebarOpen: boolean;
    setOpenNavDrawer: (openNavDrawer: any) => void
    setDashboardTitle: (dashboardTitle: any) => void
    setIsSidebarOpen: (isSidebarOpen: any) => void
}

// const defaultAppState: AppState = {
//     openNavDrawer: false,
//     dashboardTitle: "",
//     isSidebarOpen: false,
// };

export const useAppStore = create<AppState>((set) => ({
    openNavDrawer: false,
    dashboardTitle: "",
    isSidebarOpen: false,
    setOpenNavDrawer: (openNavDrawer: boolean) => set({ openNavDrawer }),
    setDashboardTitle: (dashboardTitle: string) => set({ dashboardTitle }),
    setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
}));
