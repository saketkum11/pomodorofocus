"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const TaskContext = createContext({});
const useTask = () => useContext(TaskContext);
const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [taskEditData, setTaskEditData] = useState({});
  const [singleTask, setSingleTask] = useState({});
  const getAllTask = async () => {
    try {
      const res = await axios.get("/api/tasks/getTask");
      console.log("from alltask", res);
      setTaskList(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const addTask = async (taskData) => {
    try {
      const res = await axios.post("/api/tasks/addTask", taskData);

      setTaskEditData(res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteTask = async (taskDataDelete) => {
    try {
      const res = await axios.post("/api/tasks/deleteTask", taskDataDelete);

      setTaskEditData(res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const updateTask = async ({ _id, title, description, esTime }) => {
    try {
      const res = await axios.patch("/api/tasks/updateTask", {
        _id,
        title,
        description,
        esTime,
      });
      setTaskEditData(res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getTaskById = async (id) => {
    try {
      const res = await axios.get(`/api/tasks/${id}`);
      setSingleTask(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const taskCompleted = async (taskdata) => {
    console.log(taskdata._id);
    try {
      const res = await axios.patch(
        `/api/tasks/updateTask/${taskdata._id}`,
        taskdata
      );
      console.log("from taskcompleted", res);
      setSingleTask(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllTask();
  }, []);
  return (
    <TaskContext.Provider
      value={{
        setTaskEditData,
        taskEditData,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
        taskCompleted,
        getAllTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export { useTask, TaskProvider };
