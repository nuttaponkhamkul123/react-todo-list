// import './style.css'
import Task from './components/Task/Task';

import { Palette, GripVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import {
    useDroppable
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { useTaskData } from '@/context/task-data.context';


const PRESET_COLORS = [
    '#ffffff', // Default
    '#ef4444', // Red 500
    '#f59e0b', // Amber 500
    '#eab308', // Yellow 500
    '#22c55e', // Green 500
    '#3b82f6', // Blue 500
    '#6366f1', // Indigo 500
    '#a855f7', // Purple 500
    '#ec4899', // Pink 500
];

export function TaskBlock({ taskBlockData, blockId }: { taskBlockData: any, blockId: number }) {

    const contextData = useTaskData();

    // For sorting the block horizontally
    const {
        attributes,
        listeners,
        setNodeRef: setSortableNodeRef,
        transform,
        transition,
        isDragging: isDraggingBlock,
    } = useSortable({
        id: taskBlockData.id,
        data: {
            type: 'Block',
            taskBlockData,
        },
    });

    // For dropping tasks into this block
    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id: taskBlockData.id,
        data: {
            type: 'Block',
            taskBlockData,
        },
    });

    const addTask = () => {
        contextData.addTask(taskBlockData)
    }

    const sortedTasks = useMemo(() => {
        return contextData.taskBlocks[blockId]?.tasks || [];
    }, [contextData.taskBlocks, blockId]);

    const onTaskTextChanges = (taskId: string, text: string) => {
        contextData.setTaskBlocks((currentTaskBlocks: any[]) => {
            return currentTaskBlocks.map((block) => {
                if (block.id !== taskBlockData.id) {
                    return block;
                }
                return {
                    ...block,
                    tasks: block.tasks.map((task: any) => {
                        if (task.id !== taskId) {
                            return task;
                        }
                        const res = { ...task, text: text };
                        return res;
                    })
                };
            });
        });
    };

    const onTaskBlockTextChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        contextData.setTaskBlocks((currentTaskBlocks: any[]) => {
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

    const blockStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        borderLeft: taskBlockData.color && taskBlockData.color !== '#ffffff' ? `4px solid ${taskBlockData.color}` : undefined,
        backgroundColor: taskBlockData.color && taskBlockData.color !== '#ffffff' ? `${taskBlockData.color}10` : undefined,
    };

    return (
        <div
            ref={setSortableNodeRef}
            className={`
                task-block flex flex-col h-full bg-background/40 backdrop-blur-md border border-white/10 rounded-3xl min-w-[320px] max-w-[320px] transition-all duration-300 shadow-2xl shadow-black/5
                ${isOver ? 'bg-background/60 ring-2 ring-primary/20' : ''}
                ${isDraggingBlock ? 'opacity-50 z-50' : ''}
            `}
            style={blockStyle}
        >
            <div className="pt-5 px-4 mb-4 flex items-center justify-between gap-1 group">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                        className="p-1 rounded-md text-muted-foreground/60 hover:text-primary hover:bg-primary/10 cursor-grab active:cursor-grabbing transition-colors shrink-0"
                        {...attributes}
                        {...listeners}
                    >
                        <GripVertical size={20} />
                    </div>

                    <input
                        className="font-bold text-lg bg-transparent outline-none text-foreground w-full placeholder:text-muted-foreground/50 truncate cursor-text"
                        onChange={onTaskBlockTextChanges}
                        value={taskBlockData.blockName}
                        placeholder="List Title"
                    />
                </div>

                <div className="shrink-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground/40 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                <Palette size={18} />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-3" align="end">
                            <div className="grid grid-cols-3 gap-2">
                                {PRESET_COLORS.map((c) => (
                                    <div
                                        key={c}
                                        className="h-8 w-8 rounded-lg cursor-pointer border-2 border-border shadow-md hover:scale-110 hover:border-primary/50 transition-all"
                                        style={{ backgroundColor: c }}
                                        onClick={() => contextData.updateBlockColor(taskBlockData.id, c)}
                                    />
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 min-h-0 relative" ref={setDroppableNodeRef}>
                {sortedTasks?.length ? (
                    <div className="flex flex-col gap-2 min-h-[50px] pb-4">
                        <SortableContext
                            id={taskBlockData.id}
                            items={sortedTasks.map((t: any) => t.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {sortedTasks.map((task: any) => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    text={task.text}
                                    color={task.color}
                                    data={task}
                                    onRemoveTask={() => contextData.removeTask(task)}
                                    onUpdateTaskColor={(color: string) => contextData.updateTaskColor(task.id, color)}
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