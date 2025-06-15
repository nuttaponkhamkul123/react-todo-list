// import './style.css'

import CreateTaskBlockBtn from './CreateTaskBlockBtn';
import TaskBlock from './TaskBlock';

import { useState } from 'react';
import styles from './style.module.css';


function Content({ activeId }) {
  const [mockData, setMockData] = useState([]);
  const [mockTaskData, setMockTaskData] = useState([]);


  const addTaskHandler = (a) => {

    if (!a) return;
    const matchedIndex = mockTaskData.findIndex(x => x.id === a.id)
    if (matchedIndex <= -1) return;
    const newData = {
      id: mockTaskData[matchedIndex].tasks.length + 1,
      text: '',
      // done: false
    }
    mockTaskData[matchedIndex].tasks.push(newData);
    setMockTaskData([...mockTaskData])

  }

  const addTaskBlockHandler = () => {
    console.log("CREATE TASK BLOCK FROM PARENT")
    const newData = {
      id: mockTaskData.length + 1,
      blockName: 'untitled',
      tasks: [],
    }
    setMockTaskData([...mockTaskData, newData])
    console.log('mockTaskData ', mockTaskData)
  }


  return (
    <>
      <div className={styles['task-blocks']}>
        {mockTaskData.map((taskBlockData, blockIndex) => (
          <TaskBlock key={blockIndex} blockId={blockIndex} taskData={taskBlockData} onAddTask={addTaskHandler} activeId={activeId} />
        )
        )
        }
      </div>

      <div className="">
        <CreateTaskBlockBtn onAddTaskBlockClick={addTaskBlockHandler} />
      </div>

    </>
  )
}

export default Content