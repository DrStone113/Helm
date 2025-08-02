import React, { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddWorkspace from "../components/workspaces/AddWorkspace";
import { useGetWorkspacesQuery } from "../redux/slices/api/workspaceApiSlice";
import Loading from "../components/Loading";
import { getInitials } from "../utils";
import { FaUsers } from "react-icons/fa";

const Workspaces = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetWorkspacesQuery();

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Workspaces' />

          <Button
            onClick={() => setOpen(true)}
            label='Create Workspace'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {data?.workspaces?.map((ws) => (
            <Link
              to={`/workspace/${ws._id}`}
              key={ws._id}
              className='bg-white dark:bg-[#1f1f1f] rounded-md p-4 shadow-md'
            >
              <div className='flex items-start gap-4'>
                <div
                  className={`w-12 h-12 ${
                    ws.color
                  } rounded-md flex items-center justify-center text-white text-2xl font-semibold`}
                >
                  {getInitials(ws.name)}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold'>{ws.name}</h3>
                    <div className='flex items-center gap-1 text-gray-600'>
                      <FaUsers />
                      <span>{ws.members?.length}</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Created at{" "}
                    {new Date(ws.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-4'>
                {ws.description}
              </p>
              <div className='flex items-center justify-between mt-4'>
                <p className='text-sm text-gray-500'>
                  View workspace details and projects
                </p>
              </div>
            </Link>
          ))}
        </div>

        {!data?.workspaces?.length && (
          <div className='text-center'>
            <h3 className='text-lg font-semibold'>No Workspaces Found</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Get started by creating a new workspace.
            </p>
          </div>
        )}
      </div>
      <AddWorkspace open={open} setOpen={setOpen} />
    </>
  );
};

export default Workspaces;
