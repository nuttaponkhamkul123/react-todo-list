// import './style.css'
import Task from './components/Task/Task';
import CreateTaskBtn from './components/CreateTaskBtn/CreateTaskBtn';
import './style.css';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    DragOverlay,
    useDroppable
} from '@dnd-kit/core';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useContext, useEffect } from 'react';
import { TaskDataContext } from '@/context/task-data.context';
// import { useState } from 'react';
// import styles from './style.module.css';


export function TaskBlock({ taskData, onAddTask, blockId, activeId }) {

    const contextData = useContext(TaskDataContext);
    // const [isDragging, setIsDragging] = useState(false);
    const { setNodeRef, isOver } = useDroppable({
        id: blockId,
        data: {
            taskData
        }
    });
    const onBlockNameChanges = () => {
        console.log('ON INPUT CHANGES')
    }

    const addTask = () => {
        console.log('blockId', blockId)
        // onAddTask(taskData);
        console.log('TASK DATA', taskData);
        contextData.addTask(taskData)
    }


    const onTaskTextChanges = (a) => {
        const { text, index } = a; // e.g., index is "blockId_taskId"
        console.log('index', index)
        const [taskID, taskIdIndex] = index.split('_');
        // Use the functional form of setState to get the most recent state
        contextData.setTaskBlocks(currentTaskBlocks => {
            // 1. Create a new top-level array
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskData.id) {
                    return block;
                }

                return {
                    ...block,
                    tasks: block.tasks.map((task, idx) => {
                        if (idx !== +taskIdIndex) {
                            return task;
                        }
                        // 4. It's the right task, so create a new task object with the updated text
                        return { ...task, text: text };
                    })
                };
            });
        });
        console.log('contextData', contextData.taskBlocks)
    };

    return (
        <>
            <Card className={`task-block ${isOver ? 'over' : ''}`}>
                <CardHeader className="title" >

                    <CardTitle contentEditable="true" onInput={onBlockNameChanges}>{taskData.blockName}</CardTitle>
                    <CreateTaskBtn onAddTask={addTask} />

                </CardHeader>
                <div className="tasks" ref={setNodeRef} >
                    {/* sensors={sensors} */}
                    {contextData.taskBlocks[blockId].tasks.map((data, index) =>
                    (
                        <div>
                            android {data.text}
                            <div key={data.id + '_' + index + '_' + data.text}>
                                {/* {activeId === taskData.id + '_' + index ? null : <Task text={taskData.text} id={taskData.id + '_' + index} />} */}
                                <Task text={data.text} id={data.id + '_' + index} onTaskTextChanges={onTaskTextChanges} />
                                {/* <Task text={taskData.text} id={index} /> */}
                            </div>
                        </div>
                    )


                    )}
                    {/* <DragOverlay>
                                {activeId > -1 ?
                                    (<Task text={taskData.tasks.find(x => taskData.id + '_' + x.id === activeId)?.text || null} id={activeId} />) : null
                                }


                            </DragOverlay> */}





                </div>


            </Card>

        </>
    )
}
export default TaskBlock;