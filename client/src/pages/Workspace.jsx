import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetWorkspaceQuery } from "../redux/slices/api/workspaceApiSlice";
import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddProject from "../components/projects/AddProject";

const Workspace = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetWorkspaceQuery(id);
  const [open, setOpen] = useState(false);

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-8'>
        <Title title={data?.workspace?.title} />

        <Button
          onClick={() => setOpen(true)}
          label='New Project'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {data?.workspace?.projects?.map((project) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className='bg-white dark:bg-[#1f1f1f] rounded-md p-4 shadow-md'
          >
            <div className='flex items-start gap-4'>
              <div
                className={`w-12 h-12 ${
                  project.color || "bg-blue-600"
                } rounded-md flex items-center justify-center text-white text-2xl font-semibold`}
              >
                {project.title.charAt(0).toUpperCase()}
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold'>{project.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Created at{" "}
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-4'>
              {project.description}
            </p>
            <div className='flex items-center justify-between mt-4'>
              <p className='text-sm text-gray-500'>View project details</p>
            </div>
          </Link>
        ))}
      </div>

      {!data?.workspace?.projects?.length && (
        <div className='text-center'>
          <h3 className='text-lg font-semibold'>No Projects Found</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Get started by creating a new project.
          </p>
        </div>
      )}

      <AddProject
        open={open}
        setOpen={setOpen}
        workspaceId={id}
      />
    </div>
  );
};

export default Workspace;
