import styles from './style.module.css';


function CreateTaskBtn({ onCreateTaskClick }) {
    
    const addTask = () => {
        console.log('ADDING TASK');
        onCreateTaskClick();
    }
    return (
    <>
      <button className={styles['create-task-btn']} onClick={addTask}>Click me</button>
    </>
  )
}
export default CreateTaskBtn;