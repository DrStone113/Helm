import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateProjectMutation } from "../../redux/slices/api/projectApiSlice";
import { toast } from "sonner";
import SelectList from "../SelectList";
import UserList from "../tasks/UsersSelect";

const STATUS = ["PLANNING", "IN PROGRESS", "COMPLETED"];

const AddProject = ({ open, setOpen, workspaceId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState(STATUS[0]);
  const [team, setTeam] = useState([]);

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleOnSubmit = async (data) => {
    try {
      const res = await createProject({
        ...data,
        workspaceId,
        status,
        team,
      }).unwrap();
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
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            CREATE NEW PROJECT
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Project Title'
              type='text'
              name='title'
              label='Project Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Description'
              type='text'
              name='description'
              label='Description'
              className='w-full rounded'
              register={register("description")}
              error={errors.description ? errors.description.message : ""}
            />
            <SelectList
              label='Status'
              lists={STATUS}
              selected={status}
              setSelected={setStatus}
            />
            <div className='flex gap-4'>
              <Textbox
                placeholder='Start Date'
                type='date'
                name='startDate'
                label='Start Date'
                className='w-full rounded'
                register={register("startDate")}
                error={errors.startDate ? errors.startDate.message : ""}
              />
              <Textbox
                placeholder='Due Date'
                type='date'
                name='dueDate'
                label='Due Date'
                className='w-full rounded'
                register={register("dueDate")}
                error={errors.dueDate ? errors.dueDate.message : ""}
              />
            </div>
            <Textbox
              placeholder='Tags'
              type='text'
              name='tags'
              label='Tags'
              className='w-full rounded'
              register={register("tags")}
              error={errors.tags ? errors.tags.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <Button
                  label='Submit'
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

export default AddProject;
