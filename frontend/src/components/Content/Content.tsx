// import './style.css'

import TaskBlock from './TaskBlock/TaskBlock';

import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import styles from './style.module.css';
import { TaskDataContext } from '@/context/task-data.context';
import { LayoutList } from 'lucide-react';


import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

const Content = forwardRef(
  ({ activeId, dragEndEvent }: { activeId: any, dragEndEvent: boolean }, ref) => {
    // const [mockData, setMockData] = useState([]);
    const [mockTaskData, setMockTaskData] = useState([]);
    const contextData = useContext(TaskDataContext);


    useImperativeHandle(ref, () => ({
      dragOver: (data: any) => {
        const { active, over } = data;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // If we are dragging a block, we don't handle dragOver specifically for it here (SortableContext handles it)
        // Check if we are dragging a task
        const isActiveTask = contextData.taskBlocks.some((block: any) => block.tasks.some((task: any) => task.id === activeId));
        if (!isActiveTask) return;

        // Find the containers
        const activeContainer = contextData.taskBlocks.find((block: any) => block.tasks.some((task: any) => task.id === activeId))?.id;
        const overContainer = contextData.taskBlocks.find((block: any) => block.id === overId)?.id ||
          contextData.taskBlocks.find((block: any) => block.tasks.some((task: any) => task.id === overId))?.id;

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
          return;
        }

        // Determine new index
        const activeTaskBlock = contextData.taskBlocks.find((b: any) => b.id === activeContainer);
        const overTaskBlock = contextData.taskBlocks.find((b: any) => b.id === overContainer);

        const activeIndex = activeTaskBlock.tasks.findIndex((t: any) => t.id === activeId);
        const overIndex = overTaskBlock.tasks.findIndex((t: any) => t.id === overId);

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
      dragEnd: (data: any) => {
        const { active, over } = data;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Check if we are reordering blocks
        const isActiveBlock = contextData.taskBlocks.some((block: any) => block.id === activeId);
        const isOverBlock = contextData.taskBlocks.some((block: any) => block.id === overId);

        if (isActiveBlock && isOverBlock) {
          if (activeId !== overId) {
            contextData.moveBlock(activeId, overId);
          }
          return;
        }

        // Fallback to task reordering
        const activeContainer = contextData.taskBlocks.find((block: any) => block.tasks.some((task: any) => task.id === activeId))?.id;
        const overContainer = contextData.taskBlocks.find((block: any) => block.id === overId)?.id ||
          contextData.taskBlocks.find((block: any) => block.tasks.some((task: any) => task.id === overId))?.id;

        if (activeContainer && overContainer && activeContainer === overContainer) {
          const activeIndex = contextData.taskBlocks.find((b: any) => b.id === activeContainer).tasks.findIndex((t: any) => t.id === activeId);
          const overIndex = contextData.taskBlocks.find((b: any) => b.id === overContainer).tasks.findIndex((t: any) => t.id === overId);

          if (activeIndex !== overIndex) {
            contextData.moveTask(activeId, activeContainer, activeIndex, overContainer, overIndex);
          }
        }
      }

    }))

    const addTaskHandler = (a: any) => {
      contextData.addTask(a);
    }


    return (
      <div className={styles['task-blocks']}>
        {contextData?.taskBlocks?.length ? (
          <SortableContext
            items={contextData.taskBlocks.map((b: any) => b.id)}
            strategy={horizontalListSortingStrategy}
          >
            {contextData.taskBlocks.map((taskBlockData: any, blockIndex: number) => (
              <TaskBlock key={taskBlockData.id} blockId={blockIndex} taskBlockData={taskBlockData} />
            ))}
          </SortableContext>
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-[400px] py-20 px-4 text-center animate-in fade-in zoom-in duration-500">
            <div className="relative mb-6 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-secondary/50 border border-border group-hover:border-primary/50 transition-colors">
                <LayoutList className="w-12 h-12 text-foreground/80 group-hover:text-primary transition-colors" />
              </div>
            </div>
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your workspace is empty
            </h3>
            <p className="mt-2 text-foreground/70 max-w-[280px] text-sm leading-relaxed">
              Add your first list to start organizing your thoughts and boost your productivity.
            </p>
          </div>
        )}
      </div>
    )

  }
)
export default Content;
