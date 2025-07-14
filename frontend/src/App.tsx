// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import { DndContext, useSensor, PointerSensor, KeyboardSensor, closestCenter, useSensors, DragOverlay } from '@dnd-kit/core';
import { useRef, useState } from 'react';
import { TaskDataContext } from './context/task-data.context';
import { TaskDataProvider } from './provider/task-data.provider';


function App() {
  // const [count, setCount] = useState(0)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );


  const [activeId, setActiveId] = useState(-1);
  const [dragEndEvent, setDragEndEvent] = useState<any>(null);
  const contentRef = useRef(null);



  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    if (!contentRef?.current) return;
    const currentDraggableTask = event.active.data.current;
    const overOn = event.over;
    const taskBlockOverOn = overOn.data.current.taskBlockData;
    if (taskBlockOverOn.id === currentDraggableTask.parentId) return;
    const collisionOver = event.collisions[0];


    const payload = {
      // this is task id not container
      taskData: currentDraggableTask,
      to: overOn.data.current
    };
    // const currentItem =
    (contentRef.current as any).dragEnd(payload);
    // setActiveId(-1);
  }


  // onDragEnd={handleDragEnd}
  return (
    <>
      <div className="outer ">
        {/* onDragStart={handleDragStart} */}
        <Header />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart} onDragEnd={handleDragEnd}
        >

          <TaskDataProvider>

            <Content ref={contentRef} activeId={activeId} dragEndEvent={dragEndEvent} />

          </TaskDataProvider>



          <DragOverlay>
            {activeId > -1 ?
              null : null
            }


          </DragOverlay>
        </DndContext>

      </div>
    </>
  )
}

export default App
