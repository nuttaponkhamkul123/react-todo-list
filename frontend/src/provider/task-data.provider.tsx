import { useState } from "react";
import { TaskDataContext } from '../context/task-data.context'
import { v4 as uuidv4 } from 'uuid';


export const TaskDataProvider = ({ children }) => {
    const [taskBlocks, setTaskBlocks] = useState([]);



    const addTask = (targetTaskBlock) => {
        if (!targetTaskBlock) return;
        const matchedIndex = taskBlocks.findIndex(x => x.id === targetTaskBlock.id)
        if (matchedIndex < -1) return;
        const newData = {
            id: uuidv4(),
            text: '',
        }
        taskBlocks[matchedIndex].tasks.push(newData);
        // contextData[matchedIndex].tasks.pu
        setTaskBlocks([...taskBlocks])

    }
    const removeTask = (blockId, taskID) => {
        console.log('blockId', blockId)
        console.log('taskID', taskID)
        setTaskBlocks((currentTaskBlocks) => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== blockId) {
                    return block;
                }
                const res = {
                    ...block,
                    tasks: block.tasks.map((task, idx) => {
                        if (task.id !== taskID) {
                            return task;
                        }
                        console.log('MATCHED ', task)
                        return null;
                    }).filter(Boolean)
                }
                console.log('RES ', res)
                return res;
            });
        })
    }
    const addTaskBlock = () => {
        const newData = {
            id: uuidv4(),
            blockName: 'untitled',
            tasks: [],
        }
        setTaskBlocks([...taskBlocks, newData])
        console.log('taskBlocks ', taskBlocks)
    }
    const data = {
        taskBlocks,
        addTaskBlock,
        addTask,
        removeTask,
        setTaskBlocks
    }

    return (
        <TaskDataContext.Provider value={data} >
            {children}
        </TaskDataContext.Provider>
    );
};