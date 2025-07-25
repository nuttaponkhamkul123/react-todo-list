
// import styles from './style.module.css';
import { useState } from 'react';
import './style.css';
import { useDraggable } from '@dnd-kit/core';



function Task(props) {
  const [isCardFocusing, setIsCardFocusing] = useState(false);
  // const 
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    enabled: !isCardFocusing,
    data: props.data

  });
  const style = {
    position: isDragging ? 'fixed' : "static",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 999 : 1,
    width: isDragging ? '200px' : 'unset',
    cursor: 'grab',
  };

  // eslint-disable-next-line no-unused-vars
  const onTaskTextChanges = (event) => {
    const text = event.target.value;
    props.onTaskTextChanges({ text, index: props.id });
  }
  const onTaskFocus = () => {
    setIsCardFocusing(true);


  }
  const onTaskBlur = () => {
    setIsCardFocusing(false);

  }
  return (
    <>
      <div ref={setNodeRef} style={style} className={`task-card ${isDragging ? 'dragging' : ''}`}>
        <span   {...listeners} {...attributes}>
          <svg fill="#000000" width="20" height="20" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>drag-handle-line</title>
            <circle cx="15" cy="12" r="1.5" className="clr-i-outline clr-i-outline-path-1"></circle><circle cx="15" cy="24" r="1.5" class="clr-i-outline clr-i-outline-path-2"></circle><circle cx="21" cy="12" r="1.5" class="clr-i-outline clr-i-outline-path-3"></circle><circle cx="21" cy="24" r="1.5" class="clr-i-outline clr-i-outline-path-4"></circle><circle cx="21" cy="18" r="1.5" class="clr-i-outline clr-i-outline-path-5"></circle><circle cx="15" cy="18" r="1.5" class="clr-i-outline clr-i-outline-path-6"></circle>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
          </svg></span>
        <input onInput={onTaskTextChanges} onFocus={onTaskFocus} onBlur={onTaskBlur} value={props.text} className="task-input" />
        <span className="task-operators">
          <span className="task-operator remove-task">-</span>
        </span>
      </div>
    </>
  )
}
export default Task;