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


import { useContext } from 'react';
import { TaskCard } from './components/Content/TaskBlock/components/Task/Task';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const [activeId, setActiveId] = useState(-1);
  const [dragEndEvent, setDragEndEvent] = useState<any>(null);
  const contentRef = useRef(null);
  const contextData = useContext(TaskDataContext);


  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: any) {
    if (!contentRef?.current) return;
    const { active, over } = event;
    (contentRef.current as any).dragOver({ active, over });

  }

  function handleDragEnd(event: any) {
    if (!contentRef?.current) return;
    const { active, over } = event;

    (contentRef.current as any).dragEnd({ active, over });
    setActiveId(-1);
  }

  const activeTask = activeId ? contextData.taskBlocks
    .flatMap(block => block.tasks)
    .find(task => task.id === activeId) : null;


  // onDragEnd={handleDragEnd}
  return (
    <>
      <div className="outer ">
        {/* onDragStart={handleDragStart} */}
        <Header />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >

          <Content ref={contentRef} activeId={activeId} dragEndEvent={dragEndEvent} />

          <DragOverlay>
            {activeTask ? (
              <TaskCard
                text={activeTask.text}
                id={activeTask.id}
                onRemoveTask={() => { }}
                onTaskTextChanges={() => { }}
                isDragging={true}
                className="opacity-80 rotate-2 scale-105 shadow-xl cursor-grabbing bg-background/90 backdrop-blur-sm border-primary/50"
              />
            ) : null}
          </DragOverlay>
        </DndContext>

      </div>
    </>
  )
}

export default App
