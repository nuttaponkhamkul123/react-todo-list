// import './style.css'

import CreateTaskBlockBtn from './CreateTaskBlockBtn/CreateTaskBlockBtn';
import TaskBlock from './TaskBlock/TaskBlock';

import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import styles from './style.module.css';
import { TaskDataContext } from '@/context/task-data.context';
import { TaskDataProvider } from '@/provider/task-data.provider';


const Content = forwardRef(
  ({ activeId, dragEndEvent }: { activeId: string, dragEndEvent: boolean }, ref) => {
    // const [mockData, setMockData] = useState([]);
    const [mockTaskData, setMockTaskData] = useState([]);
    const contextData = useContext(TaskDataContext);


    useImperativeHandle(ref, () => ({
      dragEnd: (data) => {
        const { from, to } = data;
        const [containerID, index] = from.split('_');
        const fromTaskBlock = contextData.taskBlocks.find(x => x.id === containerID);

        if (!fromTaskBlock) return;
        console.log('index', index)
        const toMoveElement = fromTaskBlock.tasks[+index];

        // to.taskData.tasks.push(toMoveElement);
        // fromTaskBlock.splice(index, 1);
        console.log('toMoveElement', toMoveElement)
        contextData.removeTask(containerID, toMoveElement.id);


      }

    }))

    const addTaskHandler = (a) => {
      contextData.addTask(a);
    }

    const addTaskBlockHandler = () => {
      contextData.addTaskBlock();
    }


    return (
      <>


        <div className={styles['task-blocks']}>
          {contextData.taskBlocks.map((taskBlockData, blockIndex) => (

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
)
export default Content;
