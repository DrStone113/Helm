import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectQuery } from "../redux/slices/api/projectApiSlice";
import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { GrInProgress } from "react-icons/gr";
import { MdGridView, MdTaskAlt } from "react-icons/md";
import { FaList, FaBug, FaArrowRight } from "react-icons/fa";
import BoardView from "../components/tasks/BoardView";
import AddTask from "../components/tasks/AddTask";
import Tabs from "../components/Tabs";

const TABS = [
  { title: "All Tasks", icon: <FaList /> },
  { title: "To Do", icon: <FaArrowRight /> },
  { title: "In Progress", icon: <GrInProgress /> },
  { title: "Done", icon: <MdTaskAlt /> },
];

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProjectQuery(id);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (data?.project?.tasks) {
      if (selected === 0) {
        setFilteredTasks(data?.project?.tasks);
      } else {
        const tab = TABS[selected]?.title.toLowerCase();
        setFilteredTasks(
          data?.project?.tasks.filter((task) => task.stage === tab)
        );
      }
    }
  }, [data, selected]);

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );

  const status = data?.project?.tasks?.reduce(
    (acc, task) => {
      if (task.stage === "todo") acc.todo += 1;
      else if (task.stage === "in progress") acc.inProgress += 1;
      else if (task.stage === "done") acc.done += 1;
      return acc;
    },
    { todo: 0, inProgress: 0, done: 0 }
  );

  const progress =
    data?.project?.tasks?.length > 0
      ? (status?.done / data?.project?.tasks?.length) * 100
      : 0;

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <Button
            onClick={() => navigate(-1)}
            label='Back'
            className='flex flex-row-reverse items-center gap-1 text-gray-600 hover:text-black'
          />
          <Title title={data?.project?.title} />
          <p className='text-gray-600'>{data?.project?.description}</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600'>Progress:</span>
            <div className='w-32 h-2 bg-gray-200 rounded-full'>
              <div
                className='h-2 bg-blue-600 rounded-full'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className='font-semibold'>{Math.round(progress)}%</span>
          </div>

          <Button
            onClick={() => setOpen(true)}
            label='Add Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
          <FiSettings className='text-2xl text-gray-600 cursor-pointer' />
        </div>
      </div>

      <div className='flex items-center justify-between mb-8'>
        <Tabs tabs={TABS} setSelected={setSelected} />

        <div className='flex items-center gap-4 text-gray-600'>
          <span>Status:</span>
          <div className='flex items-center gap-2'>
            <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full'>
              {status?.todo} To Do
            </span>
            <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full'>
              {status?.inProgress} In Progress
            </span>
            <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full'>
              {status?.done} Done
            </span>
          </div>
        </div>
      </div>

      <BoardView tasks={filteredTasks} />

      <AddTask
        open={open}
        setOpen={setOpen}
        projectId={id}
        project={data?.project}
      />
    </div>
  );
};

export default Project;
