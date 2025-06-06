
import styles from './style.module.css';


function Task(props) {
  const onTaskTextChanges = (event) => {
    const text = event.currentTarget.textContent;
     props.onTaskTextChanges(text , props.index);
    console.log('props' ,)
  }
    return (
    <>
    <div className={styles['task-card']}>

      text : <span contentEditable="true" onInput={onTaskTextChanges} className="task-input">{ props.text }</span>
    </div>
    </>
  )
}
export default Task;