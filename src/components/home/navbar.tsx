"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useScreenSize from "@/hooks/use-screen-size";
import { usePathname, useRouter } from "next/navigation";
import { CloseButton } from "@headlessui/react";
import { useAppStore } from "@/stores/app";
import cn from "@/utils/class_names";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Badge } from "rizzui";
import AppLogo from "../logo";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";

interface NavItemProps {
    text: string;
    route: string;
    isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ text, isActive, route }) => {
    const getTotalItems = useCartStore((state) => state.getTotalItems());
    return (
        <div className="flex flex-col items-center">
            <Link href={route} className={cn("text-tertiary-700 flex gap-2 items-center", isActive && "font-bold text-primary-700")}>
                <span>{text}</span>  {route == '/products/cart' && <Badge size="sm" ><>{getTotalItems}</></Badge>}
            </Link>

        </div>
    );
};

const navItems: NavItemProps[] = [
    { text: "Home", route: "/" },
    { text: "Products", route: "/products" },
    { text: "Cart", route: "/products/cart" },
];

const Navbar: React.FC = () => {
    const { width } = useScreenSize();
    // const [app,] = useAtom(appAtom);
    // const updateNavDrawer = useSetAtom(openNavDrawerAtom);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
    const currentPath = usePathname()
    const router = useRouter();
    const openNavDrawer = useAppStore((state) => state.openNavDrawer);
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const logout = useUserStore((state) => state.logout);

    const handleCloseNavDrawer = useCallback(() => {
        // updateNavDrawer(false);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (openNavDrawer) {
            handleCloseNavDrawer();
        }
    }, [openNavDrawer, handleCloseNavDrawer]);

    const handleLogout = () => {
        logout();
        router.push('/');
    }

    return (
        <>
            {openNavDrawer && (
                <div
                    className="absolute h-full w-full inset-0 bg-black opacity-50 cursor-pointer z-[99]"
                    onClick={handleCloseNavDrawer}
                />
            )}
            <header className="fixed w-full z-[999]">
                <div className="flex justify-between items-center h-[90px] lg:h-[121px] app_container relative z-[999] leading-tight bg-[#F2F9F5] !backdrop-blur-lg">
                    {/* Logo */}
                    {/* <Logo className={cn(width < 1024 ? "h-[46.49px] w-[46px]" : "h-[66.49px] w-[66px]")} /> */}
                    <AppLogo />

                    {/* Hamburger Icon for Mobile Screens */}
                    {width < 1024 ? (
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden flex items-center text-white"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6 fill-black" />
                            ) : (<Bars3Icon className="h-6 w-6 fill-black" />)}
                        </button>
                    ) : (
                        // Full Navigation for Larger Screens
                        <nav className="hidden lg:flex gap-10 self-stretch my-auto text-zinc-700">
                            {navItems.map((item, index) => (
                                <NavItem key={index} {...item} isActive={currentPath === item.route} />
                            ))}
                        </nav>
                    )}

                    {width >= 1024 && (
                        isAuthenticated ? (
                            <Link href={'#'} onClick={handleLogout} className={cn("text-green-700")}>
                                {'Logout'}
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 font-bold">
                                <Link href={'/login'} className={cn("text-tertiary-700")}>
                                    {'Login'}
                                </Link>
                                <Link href={'/register'} className={cn("text-green-700")}>
                                    {'Register'}
                                </Link>
                            </div>
                        )
                    )}

                </div>

                {isMenuOpen && width < 1024 && (
                    <nav className="absolute top-[90px] left-0 w-full bg-primary-100 text-zinc-700 z-[998] bg-white shadow-xl">
                        <ul className="flex flex-col items-center gap-5 py-4">
                            {navItems.map((item, index) => (
                                <li key={index} onClick={() => setIsMenuOpen(false)}>
                                    <NavItem {...item} />
                                </li>
                            ))}
                            {isAuthenticated ? (
                                <Link href={'#'} onClick={handleLogout} className={cn("text-green-700")}>
                                    {'Logout'}
                                </Link>
                            ) : (<li className="flex items-center gap-2 font-bold border-t">
                                <Link href={'/login'} className={cn("text-tertiary-700")}>
                                    {'Login'}
                                </Link>

                                <Link href={'/register'} className={cn("text-green-700 ")}>
                                    {'Register'}
                                </Link>
                            </li>)}
                        </ul>
                    </nav>
                )}
            </header>
        </>
    );
};

export default Navbar;
