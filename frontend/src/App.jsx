// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import { useDroppable, DndContext, useSensor, PointerSensor, KeyboardSensor, closestCenter, useSensors, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';


function App() {
  // const [count, setCount] = useState(0)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const [activeId, setActiveId] = useState(null);


  function handleDragStart(event) {
    console.log('event.active.id' , event.active.id)
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }



  // onDragEnd={handleDragEnd}
  return (
    <>
      <div className="outer">
        {/* onDragStart={handleDragStart} */}
        <Header />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart} onDragEnd={handleDragEnd}
        >
          <Content activeId={activeId} />


          <DragOverlay>
            {/* <Task text={taskData.tasks.find(x => taskData.id + '_' + x.id === activeId)?.text || null} id={activeId} /> */}
                                {activeId > -1 ?
                                   (<div>123</div>) : null
                                }


                            </DragOverlay>
        </DndContext>

      </div>
    </>
  )
}

export default App
