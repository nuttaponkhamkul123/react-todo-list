// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import { DndContext, useSensor, PointerSensor, KeyboardSensor, closestCenter, useSensors, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';


function App() {
  // const [count, setCount] = useState(0)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const [activeId, setActiveId] = useState(null);


  function handleDragStart(event) {
    console.log('event.active.id', event.active.id)
    console.log('event', event)
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    setActiveId(null);
    const overOn = event.over;
    const collisionOver = event.collisions[0];

    console.log('overOn ' , overOn);
    console.log('collisionOver' , collisionOver)
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
          <Content activeId={activeId} />

          <DragOverlay>
            {/* <Task text={taskData.tasks.find(x => taskData.id + '_' + x.id === activeId)?.text || null} id={activeId} /> */}
            {activeId > -1 ?
              // (<Task text={taskData.tasks.find(x => taskData.id + '_' + x.id === activeId)?.text || null} id={activeId} />) : null
              (<div style="background:red;width:50px;height:50px;">HELLO WORLD</div>) : null

            }


          </DragOverlay>
        </DndContext>

      </div>
    </>
  )
}

export default App
