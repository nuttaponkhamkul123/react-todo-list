// import './style.css'
import Task from './components/Task/Task';

import {
    useDroppable
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useContext } from 'react';
import { TaskDataContext } from '@/context/task-data.context';


export function TaskBlock({ taskBlockData, onAddTask, blockId, activeId }) {

    const contextData = useContext(TaskDataContext);
    // const [isDragging, setIsDragging] = useState(false);
    const { setNodeRef, isOver } = useDroppable({
        id: taskBlockData.id,
        data: {
            taskBlockData
        }
    });
    const addTask = () => {
        contextData.addTask(taskBlockData)
    }
    const onTaskTextChanges = (a) => {
        const { text, index: id } = a;
        const taskBlockIdx = taskBlockData.tasks.findIndex(x => x.id === id)
        if (taskBlockIdx <= -1) return;
        contextData.setTaskBlocks(currentTaskBlocks => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskBlockData.id) {
                    return block;
                }
                return {
                    ...block,
                    tasks: block.tasks.map((task, idx) => {
                        if (idx !== +taskBlockIdx) {
                            return task;
                        }
                        const res = { ...task, text: text };
                        return res;
                    })
                };
            });
        });
    };
    const onTaskBlockTextChanges = (e) => {
        contextData.setTaskBlocks(currentTaskBlocks => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskBlockData.id) {
                    return block;
                }
                return {
                    ...block,
                    blockName: e.target.value

                };
            });
        });
    }
    return (
        <div
            className={`
                flex flex-col w-84 shrink-0 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-xl shadow-2xl shadow-black/5 max-h-full transition-all duration-300
                ${isOver ? 'bg-background/60 ring-2 ring-primary/20' : ''}
            `}
        >
            <div className="p-4 flex items-center justify-between gap-2 group">
                <input
                    className="font-semibold text-base bg-transparent outline-none text-foreground w-full placeholder:text-muted-foreground/50 truncate"
                    onChange={onTaskBlockTextChanges}
                    value={taskBlockData.blockName}
                    placeholder="List Title"
                />
            </div>

            <div className="flex-1 overflow-y-auto px-2 min-h-0 relative" ref={setNodeRef}>
                {contextData.taskBlocks[blockId]?.tasks?.length ? (
                    <div className="flex flex-col gap-2 min-h-[50px] pb-4">
                        <SortableContext
                            id={taskBlockData.id}
                            items={contextData.taskBlocks[blockId]?.tasks.map(t => t.id) || []}
                            strategy={verticalListSortingStrategy}
                        >
                            {contextData.taskBlocks[blockId]?.tasks.map((task) => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    text={task.text}
                                    color={task.color}
                                    data={task}
                                    onRemoveTask={() => contextData.removeTask(task)}
                                    onUpdateTaskColor={(color) => contextData.updateTaskColor(task.id, color)}
                                    onTaskTextChanges={onTaskTextChanges}
                                />
                            ))}
                        </SortableContext>
                    </div>

                ) : <div></div>}

                <div className="sticky bottom-0 z-10 pb-4 bg-transparent pointer-events-none">
                    <div
                        onClick={addTask}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-primary/20 text-primary transition-all cursor-pointer text-sm font-bold select-none border border-primary/20 hover:border-primary/40 pointer-events-auto shadow-md backdrop-blur-md"
                    >
                        <span className="text-xl leading-none font-black">+</span> Add a task
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskBlock;