import React from "react";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  const todoTasks = tasks?.filter((task) => task.stage === "todo");
  const inProgressTasks = tasks?.filter((task) => task.stage === "in progress");
  const doneTasks = tasks?.filter((task) => task.stage === "done");

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h4 className='text-2xl text-gray-600'>To Do</h4>
          <span className='text-gray-600'>{todoTasks?.length}</span>
        </div>
        <div className='space-y-4'>
          {todoTasks?.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
          {todoTasks?.length === 0 && (
            <div className='text-center text-gray-500'>No tasks</div>
          )}
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between mb-4'>
          <h4 className='text-2xl text-gray-600'>In Progress</h4>
          <span className='text-gray-600'>{inProgressTasks?.length}</span>
        </div>
        <div className='space-y-4'>
          {inProgressTasks?.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
          {inProgressTasks?.length === 0 && (
            <div className='text-center text-gray-500'>No tasks</div>
          )}
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between mb-4'>
          <h4 className='text-2xl text-gray-600'>Done</h4>
          <span className='text-gray-600'>{doneTasks?.length}</span>
        </div>
        <div className='space-y-4'>
          {doneTasks?.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
          {doneTasks?.length === 0 && (
            <div className='text-center text-gray-500'>No tasks</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardView;
