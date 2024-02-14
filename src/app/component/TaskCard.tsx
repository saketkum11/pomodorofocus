"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Task from "../task/page";
import TaskList from "./TaskList";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const TaskCard = ({ setToggleTask, handleTask, allTasks }: any) => {
  const { taskEditData, addTask }: any = useTask();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    estTime: 1,
  });
  const [tasksDataBase, setTasksDataBase] = useState([]);
  const { title, description, estTime } = taskData;
  const { token, getAllTask }: any = useAuth();
  const onChange = (e: any) => {
    setTaskData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleOnCancel = (e: any) => {
    e.stopPropagation();
    setToggleTask((flag: any) => !flag);
  };

  const increment = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setTaskData((prev) => {
      return { ...prev, estTime: estTime + 1 };
    });
  };
  const decrement = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setTaskData((prev) => {
      return { ...prev, estTime: estTime - 1 };
    });
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      addTask(taskData);
      setToggleTask((flag: any) => !flag);
      toast.success("SuccessFully created Task");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setTaskData({
        title: "",
        description: "",
        estTime: 1,
      });
    }
  };

  useEffect(() => {
    const getAllTaskList = async () => {
      try {
        const { data } = await axios.get("/api/tasks/getTask");
        handleTask(data.data);
      } catch (error: any) {
        console.log("Signup failed", error);
        toast.error(error.message);
      }
    };
    getAllTaskList();
  }, [handleTask, allTasks]);

  return (
    <div className="absolute -top-40 right-0 left-0 bg-white text-black rounded-lg">
      {tasksDataBase.map((task: any) => (
        <TaskList task={task} key={task._id} />
      ))}

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
                name="estTime"
                value={estTime}
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

export default TaskCard;
