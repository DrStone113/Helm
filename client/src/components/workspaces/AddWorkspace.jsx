import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateWorkspaceMutation } from "../../redux/slices/api/workspaceApiSlice";
import { toast } from "sonner";

const COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-gray-500",
];

const AddWorkspace = ({ open, setOpen, workspace }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [color, setColor] = useState(COLORS[0]);

  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();

  const handleOnSubmit = async (data) => {
    try {
      const res = await createWorkspace({ ...data, color }).unwrap();
      toast.success(res.message);
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-lg font-bold leading-6 text-gray-900 mb-4'
          >
            {workspace ? "Update Workspace" : "Create New Workspace"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Test Workspace'
              type='text'
              name='name'
              label='Workspace Name'
              className='w-full rounded'
              register={register("name", {
                required: "Name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='For testing'
              type='text'
              name='description'
              label='Workspace Description'
              className='w-full rounded'
              register={register("description")}
              error={errors.description ? errors.description.message : ""}
            />

            <div>
              <label className='text-sm text-gray-600'>Workspace Color</label>
              <div className='flex gap-2 mt-2'>
                {COLORS.map((c, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full cursor-pointer ${c} ${
                      color === c
                        ? "ring-2 ring-offset-2 ring-orange-500"
                        : ""
                    }`}
                    onClick={() => setColor(c)}
                  ></div>
                ))}
              </div>
            </div>

            <div className='py-3 sm:flex sm:flex-row-reverse gap-4'>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <Button
                  label='Create'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddWorkspace;
