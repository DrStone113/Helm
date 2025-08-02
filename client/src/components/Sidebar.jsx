import clsx from "clsx";
import React from "react";
import { FaTasks, FaTrashAlt, FaUsers, FaRegFolder } from "react-icons/fa";
import {
    MdChevronRight,
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdTaskAlt,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import SettingsMenu from "./SettingsMenu";





const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Workspaces",
        link: "workspaces",
        icon: <FaRegFolder />,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <FaTasks />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <MdTaskAlt />,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "Team",
        link: "team",
        icon: <FaUsers />,
    },
    {
        label: "Status",
        link: "status",
        icon: <IoCheckmarkDoneOutline />,
    },
    {
        label: "Trash",
        link: "trashed",
        icon: <FaTrashAlt />,
    },
];

const Sidebar = () => {
    const { user, isSidebarOpen } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

    const handleToggleSidebar = () => {
        dispatch(setOpenSidebar(!isSidebarOpen));
    };



    const NavLink = ({ el }) => {
        const isActive = path === el.link.split("/")[0];

        return (
            <Link
                to={`/${el.link}`}
                className={clsx(
                    "w-full flex gap-2 px-3 py-2 rounded-full items-center text-base transition-colors duration-200",
                    !isSidebarOpen && "justify-center",

                    {
                        "bg-blue-700 text-white pointer-events-none": isActive,
                        "text-black dark:text-white hover:bg-[#2564ed2d]": !isActive,
                    }


                )}
            >
                {el.icon}
                <span className={!isSidebarOpen ? "hidden" : "block"}>
                    {el.label}
                </span>
            </Link>
        );
    };

    return (
        <div
            className={clsx(
                "w-full h-full flex flex-col gap-6 relative",
                isSidebarOpen ? "p-5" : "py-5 px-3"
            )}
        >

            <button
                onClick={handleToggleSidebar}
                className='absolute -right-3 top-20 bg-blue-600 text-white p-1 rounded-full text-2xl cursor-pointer z-50'
            >

                <MdChevronRight className={isSidebarOpen ? "rotate-180" : ""} />

            </button>
            <div
                className={clsx(
                    "flex gap-2 items-center",
                    !isSidebarOpen && "justify-center"
                )}
            >
                <p className='bg-blue-600 p-2 rounded-full'>
                    <MdOutlineAddTask className='text-white text-2xl font-black' />
                </p>
                <span
                    className={clsx(
                        "text-2xl font-bold text-black dark:text-white",
                        !isSidebarOpen && "hidden"
                    )}
                >
                    Planex
                </span>
            </div>

            <div className='flex-1 flex flex-col gap-y-5 py-8'>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>

            <div className=''>
                <SettingsMenu />
            </div>



        </div>
    );
};

export default Sidebar;
