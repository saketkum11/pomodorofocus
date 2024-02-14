"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useTask } from "../context/TaskContext";
import TaskEditModal from "./TaskEditModal";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";

const TaskList = ({ task, setToggleTask, setAllTasks, allTasks }: any) => {
  const { setTaskEditData }: any = useTask();
  const [taskModal, setTaskModal] = useState(false);
  const { deleteTask, getTaskById, taskCompleted }: any = useTask();
  const getAllTaskList = async () => {
    try {
      const { data } = await axios.get("/api/tasks/getTask");
      setAllTasks(data.data);
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    }
  };
  const handleDeleteTask = async () => {
    try {
      getAllTaskList();
      deleteTask(task);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleUpdate = async () => {
    setTaskModal((flag: any) => !flag);
    setTaskEditData(task);
  };

  const handleCompletedTask = async (e: any) => {
    try {
      e.stopPropagation();
      taskCompleted(task);
      const { data } = await axios.get("/api/tasks/getTask");
      setAllTasks(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    const getAllTaskList = async () => {
      try {
        const { data } = await axios.get("/api/tasks/getTask");
        setAllTasks(data.data);
      } catch (error: any) {
        console.log("Signup failed", error);
        toast.error(error.message);
      }
    };
    getAllTaskList();
  }, [setAllTasks]);
  return (
    <li className="relative flex justify-between gap-4  px-4 py-2 rounded-md bg-white cursor-pointer text-black">
      <div className="flex item-center gap-4">
        <button onClick={(e) => handleCompletedTask(e)}>
          {task.isCompleted ? (
            <CheckBadgeIcon className="w-6 text-emerald-700" />
          ) : (
            <CheckBadgeIcon className="w-6 text-slate-400" />
          )}
        </button>
        <span className={task.isCompleted ? "line-through" : ""}>
          {task?.title}
        </span>
      </div>
      <div className="flex gap-4 relative">
        <button onClick={() => handleUpdate()} className="hover:text-slate-500">
          <PencilSquareIcon className="w-6 " />
        </button>
        <button
          onClick={() => {
            handleDeleteTask();
          }}
          className="hover:text-slate-500"
        >
          <TrashIcon className="w-6" />
        </button>
      </div>
      {taskModal && (
        <TaskEditModal
          setTaskModal={setTaskModal}
          setAllTasks={setAllTasks}
          allTasks={allTasks}
        />
      )}
    </li>
  );
};

export default TaskList;
