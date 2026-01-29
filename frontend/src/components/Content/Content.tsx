// import './style.css'

import CreateTaskBlockBtn from './CreateTaskBlockBtn/CreateTaskBlockBtn';
import TaskBlock from './TaskBlock/TaskBlock';

import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import styles from './style.module.css';
import { TaskDataContext } from '@/context/task-data.context';


const Content = forwardRef(
  ({ activeId, dragEndEvent }: { activeId: string, dragEndEvent: boolean }, ref) => {
    // const [mockData, setMockData] = useState([]);
    const [mockTaskData, setMockTaskData] = useState([]);
    const contextData = useContext(TaskDataContext);


    useImperativeHandle(ref, () => ({
      dragOver: (data) => {
        const { active, over } = data;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Find the containers
        const activeContainer = contextData.taskBlocks.find(block => block.tasks.some(task => task.id === activeId))?.id;
        const overContainer = contextData.taskBlocks.find(block => block.id === overId)?.id ||
          contextData.taskBlocks.find(block => block.tasks.some(task => task.id === overId))?.id;

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
          return;
        }

        // Determine new index
        const activeTaskBlock = contextData.taskBlocks.find(b => b.id === activeContainer);
        const overTaskBlock = contextData.taskBlocks.find(b => b.id === overContainer);

        const activeIndex = activeTaskBlock.tasks.findIndex(t => t.id === activeId);
        const overIndex = overTaskBlock.tasks.findIndex(t => t.id === overId);

        let newIndex;
        if (overId === overContainer) {
          // We are over the container itself, so we place it at the end
          newIndex = overTaskBlock.tasks.length + 1;
        } else {
          const isBelowOverItem = over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overTaskBlock.tasks.length + 1;
        }

        contextData.moveTask(activeId, activeContainer, activeIndex, overContainer, newIndex);
      },
      dragEnd: (data) => {
        const { active, over } = data;
        if (!over) return;
        const activeContainer = contextData.taskBlocks.find(block => block.tasks.some(task => task.id === active.id))?.id;
        const overContainer = contextData.taskBlocks.find(block => block.id === over.id)?.id ||
          contextData.taskBlocks.find(block => block.tasks.some(task => task.id === over.id))?.id;

        if (activeContainer && overContainer && activeContainer === overContainer) {
          const activeIndex = contextData.taskBlocks.find(b => b.id === activeContainer).tasks.findIndex(t => t.id === active.id);
          const overIndex = contextData.taskBlocks.find(b => b.id === overContainer).tasks.findIndex(t => t.id === over.id);

          if (activeIndex !== overIndex) {
            contextData.moveTask(active.id, activeContainer, activeIndex, overContainer, overIndex);
          }
        }
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
          {contextData?.taskBlocks?.length ? contextData.taskBlocks.map((taskBlockData, blockIndex) => (
            <TaskBlock key={blockIndex} blockId={blockIndex} taskBlockData={taskBlockData} onAddTask={addTaskHandler} activeId={activeId} />
          )
          ) : <div>No data</div>
          }
        </div>

        <div>
          <CreateTaskBlockBtn onAddTaskBlockClick={addTaskBlockHandler} />
        </div>
      </>
    )

  }
)
export default Content;
