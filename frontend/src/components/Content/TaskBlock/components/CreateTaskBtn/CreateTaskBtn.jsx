// import styles from './style.module.css';
import './style.css';


function CreateTaskBtn({ onAddTask }) {

    const addTask = () => {
        onAddTask();

    }
    return (
        <>
            <button className="create-task-btn" onClick={addTask}>+</button>
        </>
    )
}
export default CreateTaskBtn;