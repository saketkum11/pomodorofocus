"use client";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTask } from "../context/TaskContext";
import axios from "axios";

const TaskEditModal = ({
  setTaskModal,
  setAllTasks,
  handleTask,
  allTasks,
}: any) => {
  const { updateTask, taskEditData, addTask }: any = useTask();
  const [taskData, setTaskData] = useState({
    title: taskEditData?.title,
    description: taskEditData?.description,
    esTime: taskEditData?.esTime,
  });
  const { title, description, esTime } = taskData;

  const onChange = (e: any) => {
    setTaskData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleOnCancel = (e: any) => {
    e.stopPropagation();
    setTaskModal((flag: any) => !flag);
  };

  const increment = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (esTime > 0) {
      setTaskData((prev) => {
        return { ...prev, esTime: esTime + 1 };
      });
    }
  };
  const decrement = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (esTime > 1) {
      setTaskData((prev: any) => {
        return { ...prev, esTime: esTime - 1 };
      });
    }
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      updateTask({ _id: taskEditData._id, title, description, esTime });
      toast.success("SuccessFully updated Task");
      setTaskModal((flag: any) => !flag);
    } catch (error: any) {
      console.error(error.message);
    }
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
  }, [setAllTasks, allTasks]);
  return (
    <div className="absolute -top-20 left-0 right-0 z-30  bg-white text-black rounded-lg">
      <div className="w-full p-4 ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="text"
              name="title"
              value={title}
              required
              onChange={(e) => onChange(e)}
              placeholder="enter title"
              className="outline-none py-4 w-full"
            />
          </div>
          <div>
            <input
              name="description"
              required
              value={description}
              onChange={(e) => onChange(e)}
              placeholder="description"
              className="  w-full outline-none"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-4">
              <label htmlFor="">est</label>
              <input
                type="number"
                required
                name="esTime"
                value={esTime}
                onChange={(e) => onChange(e)}
                className="outline-none bg-slate-200 w-12 px-2 py-2 rounded-md"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={(e) => increment(e)}
                className="outline-none bg-green-600 px-4 text-white  rounded-md"
              >
                +
              </button>
              <button
                onClick={(e) => decrement(e)}
                className="outline-none bg-slate-700 px-4 text-white  rounded-md"
              >
                -
              </button>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="flex justify-end gap-4 items-end">
              <button onClick={(e) => handleOnCancel(e)} className="underline">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-slate-500 text-white rounded-md px-4 py-2"
              >
                save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditModal;
