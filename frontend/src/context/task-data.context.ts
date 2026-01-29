import { createContext, useContext } from 'react';

export const TaskDataContext = createContext<any>([]);

export const useTaskData = () => useContext(TaskDataContext);