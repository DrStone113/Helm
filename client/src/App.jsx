// client/src/App.jsx

import Login from './pages/Login'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Workspaces from './pages/Workspaces';
import Workspace from './pages/Workspace';
import Project from './pages/Project';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Trash from './pages/Trash';
import StatusPage from './pages/Status';
import TaskDetails from './pages/TaskDetail';
import { Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'
import { setOpenSidebar } from './redux/slices/authSlice';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';
import { IoMdClose } from "react-icons/io";

function Layout() {
  const { user, isSidebarOpen } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div
        className={`h-screen bg-white dark:bg-[#1f1f1f] sticky top-0 hidden md:block transition-all duration-300 ${
          isSidebarOpen ? "w-60" : "w-16"
        }`}
      >
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {() => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 transform
             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-2/3 h-full'>
              <div className='w-full flex justify-end px-5 pt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoMdClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const App = () => {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <main className={theme}>
      <div className='w-full min-h-screen bg-[#f3f4f6] dark:bg-[#1d2125]'>
        <Routes>
          <Route element={<Layout />}>
            <Route index path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/workspaces' element={<Workspaces />} />
            <Route path='/workspace/:id' element={<Workspace />} />
            <Route path='/project/:id' element={<Project />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/completed/:status?' element={<Tasks />} />
            <Route path='/in-progress/:status?' element={<Tasks />} />
            <Route path='/todo/:status?' element={<Tasks />} />
            <Route path='/trashed' element={<Trash />} />
            <Route path='/task/:id' element={<TaskDetails />} />
            <Route path='/team' element={<Users />} />
            <Route path='/status' element={<StatusPage />} />
          </Route>

          <Route path='/login' element={<Login />} />
        </Routes>
      </div>

      <Toaster richColors position='top-center' />
    </main>
  );
};

export default App;
