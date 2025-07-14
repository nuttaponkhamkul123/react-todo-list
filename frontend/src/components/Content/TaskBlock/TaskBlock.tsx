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


export function TaskBlock({ taskBlockData, onAddTask, blockId, activeId }) {

    const contextData = useContext(TaskDataContext);
    // const [isDragging, setIsDragging] = useState(false);
    const { setNodeRef, isOver } = useDroppable({
        id: blockId,
        data: {
            taskBlockData
        }
    });
    const addTask = () => {
        contextData.addTask(taskBlockData)
    }
    const onTaskTextChanges = (a) => {
        const { text, index: id } = a;
        const taskBlockIdx = taskBlockData.tasks.findIndex(x => x.id === id)
        if (taskBlockIdx <= -1) return;
        contextData.setTaskBlocks(currentTaskBlocks => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskBlockData.id) {
                    return block;
                }
                console.log('GO HERE')
                return {
                    ...block,
                    tasks: block.tasks.map((task, idx) => {
                        if (idx !== +taskBlockIdx) {
                            return task;
                        }
                        const res = { ...task, text: text };
                        return res;
                    })
                };
            });
        });
    };
    const onTaskBlockTextChanges = (e) => {
        contextData.setTaskBlocks(currentTaskBlocks => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskBlockData.id) {
                    return block;
                }
                return {
                    ...block,
                    blockName: e.target.value

                };
            });
        });
    }
    return (
        <>
            <Card className={`task-block ${isOver ? 'over' : ''}`}>
                <CardHeader className="title" >
                    <CardTitle className="card-title"><input className="card-title-input" onChange={onTaskBlockTextChanges} value={taskBlockData.blockName} /></CardTitle>
                    <CreateTaskBtn onAddTask={addTask} />

                </CardHeader>
                <div className="tasks" ref={setNodeRef} >
                    {/* sensors={sensors} */}
                    {contextData.taskBlocks[blockId].tasks.map((data, index) =>
                    (
                        <div>
                            <div key={data.id}>
                                <Task data={data} text={data.text} id={data.id} parentId={data.parentId} onTaskTextChanges={onTaskTextChanges} />
                            </div>
                        </div>
                    )
                    )}
                </div>
            </Card>
        </>
    )
}
export default TaskBlock;