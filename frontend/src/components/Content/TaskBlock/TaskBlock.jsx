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
// import { useState } from 'react';
// import styles from './style.module.css';


function TaskBlock({ taskData, onAddTask, blockId, activeId }) {
    // const [isDragging, setIsDragging] = useState(false);
    const {  setNodeRef } = useDroppable({
        id: blockId,
    });
    const onBlockNameChanges = () => {
        console.log('ON INPUT CHANGES')
    }

    const addTask = () => {
        onAddTask(taskData);
    }
    // function handleDragEnd(e) {
    //     // const { active, over } = event;
    //     setIsDragging(false);

    // }
    // function handleDragStart(e) {
    //     console.log('SET IS DRAGGING TRUE')
    //     setIsDragging(true);
    // }
    // const findTaskById = (id) => {
    //     const foundTask = taskData.tasks.find(task => task.id === id);
    //     if (foundTask) {
    //         return foundTask;
    //     }

    //     return null;
    // };

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
                            <div key={taskData.id + '_' + index}>
                            {activeId === taskData.id + '_' + index ? null : <Task text={taskData.text} id={taskData.id + '_' + index} />}
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
            </div>
        </>
    )
}

export default TaskBlock