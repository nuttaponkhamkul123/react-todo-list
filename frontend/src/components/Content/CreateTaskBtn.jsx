import styles from './style.module.css';


function CreateTaskBtn({ onCreateTaskClick }) {
    
    const addTask = () => {
        onCreateTaskClick();
    }
    return (
    <>
      <button className={styles['create-task-btn']} onClick={addTask}>Create task</button>
    </>
  )
}
export default CreateTaskBtn;