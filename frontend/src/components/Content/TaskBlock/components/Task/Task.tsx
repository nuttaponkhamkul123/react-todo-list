
// import styles from './style.module.css';
import { useState } from 'react';
import './style.css';
import { useDraggable } from '@dnd-kit/core';



function Task(props) {
  const [isCardFocusing, setIsCardFocusing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    enabled: !isCardFocusing,

  });
  // translate3d(${transform.x}px, ${transform.y}px, 0)
  const style = {
    position: isDragging ? 'fixed' : "static", // Your fixed position
    // top: '50px',       // Example top
    // left: '50px',      // Example left
    // Apply the transform provided by dnd-kit
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 999 : 1, // Bring to front when dragging
    // padding: '20px',
    width: isDragging ? '200px' : 'unset',
    cursor: 'grab',
  };
  // const style = {};

  // eslint-disable-next-line no-unused-vars
  const onTaskTextChanges = (event) => {
    console.log('HELLO WORLD')
    // const text = event.currentTarget.textContent;
    // props.onTaskTextChanges(text, props.index);
    // console.log('props',)
  }
  const onTaskFocus = () => {
    setIsCardFocusing(true);
    console.log('ON TASK FOCUS', isCardFocusing);


  }
  const onTaskBlur = () => {
    setIsCardFocusing(false);
    console.log('ON TASK BLUR', isCardFocusing);

  }
  return (
    <>
      <div ref={setNodeRef} style={style} className={`task-card ${isDragging ? 'dragging' : ''}`}>

        <span   {...listeners} {...attributes}>
          <svg fill="#000000" width="20" height="20" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>drag-handle-line</title>
            <circle cx="15" cy="12" r="1.5" class="clr-i-outline clr-i-outline-path-1"></circle><circle cx="15" cy="24" r="1.5" class="clr-i-outline clr-i-outline-path-2"></circle><circle cx="21" cy="12" r="1.5" class="clr-i-outline clr-i-outline-path-3"></circle><circle cx="21" cy="24" r="1.5" class="clr-i-outline clr-i-outline-path-4"></circle><circle cx="21" cy="18" r="1.5" class="clr-i-outline clr-i-outline-path-5"></circle><circle cx="15" cy="18" r="1.5" class="clr-i-outline clr-i-outline-path-6"></circle>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
          </svg></span>
        <span contentEditable="true" onInput={onTaskTextChanges} onFocus={onTaskFocus} onBlur={onTaskBlur} className="task-input">{props.text}</span>
        <span className="task-operators">
          <span className="task-operator remove-task">-</span>
        </span>
      </div>
    </>
  )
}
export default Task;