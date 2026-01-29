import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Trash2, Palette } from "lucide-react";
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const PRESET_COLORS = [
  '#ffffff', // Default
  '#fee2e2', // Red
  '#ffedd5', // Orange
  '#fef9c3', // Yellow
  '#dcfce7', // Green
  '#dbeafe', // Blue
  '#e0e7ff', // Indigo
  '#f3e8ff', // Purple
  '#fce7f3', // Pink
];

export function TaskCard({ text, id, color, onRemoveTask, onUpdateTaskColor, onTaskTextChanges, style, className, listeners, attributes, setNodeRef, isDragging }) {
  const [isCardFocusing, setIsCardFocusing] = useState(false);

  const onTaskFocus = () => {
    setIsCardFocusing(true);
  }
  const onTaskBlur = () => {
    setIsCardFocusing(false);
  }
  // eslint-disable-next-line no-unused-vars
  const handleTextChange = (event) => {
    const text = event.target.value;
    onTaskTextChanges({ text, index: id });
  }

  const cardStyle = {
    ...style,
    borderLeft: color && color !== '#ffffff' ? `4px solid ${color}` : undefined,
    backgroundColor: color && color !== '#ffffff' ? `${color}15` : undefined, // Very light tint
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      className={`
                group relative flex items-center gap-2 p-3.5 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300
                ${isDragging ? 'dragging ring-2 ring-primary/20 rotate-1 scale-105 z-50 opacity-90' : 'hover:border-primary/30'}
                ${className || ''}
            `}
    >
      <div {...listeners} {...attributes} className="cursor-grab touch-none text-muted-foreground group-hover:text-foreground transition-colors p-1 -ml-1 hover:bg-muted/50 rounded-md">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5 3.5C5 3.22386 4.77614 3 4.5 3C4.22386 3 4 3.22386 4 3.5V12.5C4 12.7761 4.22386 13 4.5 13C4.77614 13 5 12.7761 5 12.5V3.5ZM8.5 3C8.77614 3 9 3.22386 9 3.5V12.5C9 12.7761 8.77614 13 8.5 13C8.22386 13 8 12.7761 8 12.5V3.5C8 3.22386 8.22386 3 8.5 3ZM12.5 3C12.7761 3 13 3.22386 13 3.5V12.5C13 12.7761 12.7761 13 12.5 13C12.22386 13 12 12.7761 12 12.5V3.5C12 3.22386 12.22386 3 12.5 3Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      <input
        onInput={handleTextChange}
        onFocus={onTaskFocus}
        onBlur={onTaskBlur}
        value={text}
        className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground/50 truncate min-w-0"
        placeholder="Type a task..."
      />

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COLORS.map((c) => (
                <div
                  key={c}
                  className="h-6 w-6 rounded-full cursor-pointer border border-border shadow-sm hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                  onClick={() => onUpdateTaskColor && onUpdateTaskColor(c)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          onClick={onRemoveTask}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


function Task(props) {
  // const [isCardFocusing, setIsCardFocusing] = useState(false);
  // const 
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging // optional, useful for styling
  } = useSortable({
    id: props.id,
    disabled: false, // Moved disabled logic to input focus in TaskCard via listeners containment or similar if needed, but for now Sortable handles drag handle.
    // Actually, useSortable disabled prop disables the whole item. 
    // We want to disable dragging when input is focused. 
    // But we are using a drag handle. So simpler:
    data: props.data
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 1,
    opacity: isDragging ? 0.3 : 1, // Visual feedback for dragging
    // width: isDragging ? '200px' : 'unset', // Moving this to CSS or keeping consistent
    cursor: 'grab',
  };

  return (
    <TaskCard
      {...props}
      style={style}
      listeners={listeners}
      attributes={attributes}
      setNodeRef={setNodeRef}
      isDragging={isDragging}
    />
  )
}
export default Task;