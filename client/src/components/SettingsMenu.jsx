import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slices/themeSlice";
import clsx from "clsx";

const SettingsMenu = () => {
  const { theme } = useSelector((state) => state.theme);
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button
        className={clsx(
            "w-full flex gap-2 p-2 items-center text-lg text-black dark:text-white",
            !isSidebarOpen && "justify-center"
        )}
      >
        <MdSettings />
        <span className={!isSidebarOpen ? "hidden" : "block"}>Settings</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute bottom-12 left-0 z-50 mt-2 w-48 origin-bottom-left divide-y divide-gray-100 rounded-md bg-white dark:bg-[#1f1f1f] shadow-2xl ring-1 ring-black/5 focus:outline-none'>
          <div className='p-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleThemeChange}
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900 dark:text-gray-300"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {theme === "light" ? (
                    <IoMdMoon className='mr-2 h-5 w-5' />
                  ) : (
                    <IoMdSunny className='mr-2 h-5 w-5' />
                  )}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SettingsMenu;
