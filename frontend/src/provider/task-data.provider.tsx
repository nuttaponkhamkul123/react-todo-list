import { useState } from "react";
import { TaskDataContext } from '../context/task-data.context'
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from "@dnd-kit/sortable";


export const TaskDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskBlocks, setTaskBlocks] = useState<any[]>([]);



    const addTask = (targetTaskBlock: any) => {
        if (!targetTaskBlock) return;
        setTaskBlocks(prevBlocks => {
            const index = prevBlocks.findIndex(x => x.id === targetTaskBlock.id);
            if (index === -1) return prevBlocks;

            const newBlock = { ...prevBlocks[index] };
            newBlock.tasks = [
                ...newBlock.tasks,
                {
                    id: uuidv4(),
                    parentId: targetTaskBlock.id,
                    text: '',
                }
            ];

            const newBlocks = [...prevBlocks];
            newBlocks[index] = newBlock;
            return newBlocks;
        });
    }
    const removeTask = (taskData: any) => {
        setTaskBlocks((currentTaskBlocks) => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskData.parentId) {
                    return block;
                }
                const updatedTasks = block.tasks.filter((task: any) => task.id !== taskData.id);
                const res = {
                    ...block,
                    tasks: updatedTasks,
                };
                return res;
            });
        });

    };
    const addTaskBlock = () => {
        const newData = {
            id: uuidv4(),
            blockName: 'untitled',
            tasks: [],
        }
        setTaskBlocks([...taskBlocks, newData])
        console.log('taskBlocks ', taskBlocks)
    }

    const moveTask = (activeId: any, activeBlockId: any, activeIndex: any, overBlockId: any, overIndex: any) => {
        setTaskBlocks((prev) => {
            const newBlocks = [...prev];
            const activeBlockIdx = newBlocks.findIndex(b => b.id === activeBlockId);
            const overBlockIdx = newBlocks.findIndex(b => b.id === overBlockId);

            if (activeBlockIdx === -1 || overBlockIdx === -1) return prev;

            const activeBlock = { ...newBlocks[activeBlockIdx] };
            activeBlock.tasks = [...activeBlock.tasks];

            // Remove from source
            const [movedTask] = activeBlock.tasks.splice(activeIndex, 1);

            // Update source block
            newBlocks[activeBlockIdx] = activeBlock;

            // If same block, insert back into same (modified) array
            // If different block, insert into target
            if (activeBlockId === overBlockId) {
                activeBlock.tasks.splice(overIndex, 0, movedTask);
            } else {
                const overBlock = { ...newBlocks[overBlockIdx] };
                overBlock.tasks = [...overBlock.tasks];
                // Update movedTask parentId
                movedTask.parentId = overBlockId;
                overBlock.tasks.splice(overIndex, 0, movedTask);
                newBlocks[overBlockIdx] = overBlock;
            }

            return newBlocks;
        });
    }

    const updateTaskColor = (taskId: any, color: any) => {
        setTaskBlocks((prev) => {
            return prev.map(block => {
                const taskIndex = block.tasks.findIndex((t: any) => t.id === taskId);
                if (taskIndex === -1) return block;

                const newBlock = { ...block };
                newBlock.tasks = [...block.tasks];
                newBlock.tasks[taskIndex] = {
                    ...newBlock.tasks[taskIndex],
                    color // Add or update color
                };
                return newBlock;
            });
        });
    }

    const updateBlockColor = (blockId: string, color: string) => {
        setTaskBlocks((prev: any[]) => {
            return prev.map(block => {
                if (block.id !== blockId) return block;
                return { ...block, color };
            });
        });
    }

    const moveBlock = (activeId: string, overId: string) => {
        setTaskBlocks((prev) => {
            const oldIndex = prev.findIndex((block) => block.id === activeId);
            const newIndex = prev.findIndex((block) => block.id === overId);

            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    const removeBlock = (blockId: string) => {
        setTaskBlocks((prev) => prev.filter((block) => block.id !== blockId));
    };

    const data: any = {
        taskBlocks,
        addTaskBlock,
        addTask,
        removeTask,
        setTaskBlocks,
        moveTask,
        updateTaskColor,
        updateBlockColor,
        moveBlock,
        removeBlock
    }

    return (
        <TaskDataContext.Provider value={data} >
            {children}
        </TaskDataContext.Provider>
    );
};