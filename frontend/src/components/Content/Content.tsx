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
        const { taskData, to } = data;
        // const [containerID, index] = from.split('_');
        const fromTaskBlock = contextData.taskBlocks.find(x => x.id === taskData.parentId);
        if (!fromTaskBlock) return;
        const t = JSON.parse(JSON.stringify(taskData))
        contextData.removeTask(taskData);
        t.parentId = to.taskBlockData.id
        to.taskBlockData.tasks.push(t);



        // // fromTaskBlock.splice(index, 1);
        // console.log('toMoveElement', toMoveElement)



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

            <TaskBlock key={blockIndex} blockId={blockIndex} taskBlockData={taskBlockData} onAddTask={addTaskHandler} activeId={activeId} />
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
