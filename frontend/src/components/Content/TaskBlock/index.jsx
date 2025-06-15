// import './style.css'
import Task from './components/Task';
import CreateTaskBtn from './components/CreateTaskBtn';
import './style.css';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    useDroppable
} from '@dnd-kit/core';
import { useState } from 'react';
// import styles from './style.module.css';


function TaskBlock({ taskData, onAddTask, blockId, activeId }) {
    const [isDragging, setIsDragging] = useState(false);
    const { isOver, setNodeRef } = useDroppable({
        id: blockId,
    });
    const onBlockNameChanges = () => {
        console.log('ON INPUT CHANGES')
    }

    const addTask = () => {
        onAddTask(taskData);
    }
    function handleDragEnd(e) {
        // const { active, over } = event;
        setIsDragging(false);

    }
    function handleDragStart(e) {
        console.log('SET IS DRAGGING TRUE')
        setIsDragging(true);
    }
    const findTaskById = (id) => {
        const foundTask = taskData.tasks.find(task => task.id === id);
        if (foundTask) {
            return foundTask;
        }

        return null;
    };

    return (
        <>


            <div className='task-block'>
                <div className="title" contentEditable="true" onInput={onBlockNameChanges}>

                    {taskData.blockName}
                    <CreateTaskBtn onAddTask={addTask} />

                </div>
                <div className="tasks" ref={setNodeRef} >
                    {/* sensors={sensors} */}
                    {taskData.tasks.map((data, index) =>
                    (
                        <div>

                            <Task text={taskData.text} id={index} />

                            <DragOverlay>
                                {activeId ?
                                    (<Task text={taskData.text} id={index} />) : null
                                }


                            </DragOverlay>

                        </div>
                    )
                    )}





                </div>
            </div>
        </>
    )
}

export default TaskBlock