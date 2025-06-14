// import './style.css'
import Task from './components/Task';
import CreateTaskBtn from './components/CreateTaskBtn';
import './style.css';

// import styles from './style.module.css';


function TaskBlock({ taskData, onAddTask }) {
    const addTask = () => {
        onAddTask(taskData);
    }
    return (
        <>

            <div className='task-block'>
                <div className="title">

                    {taskData.blockName}
                    <CreateTaskBtn onAddTask={addTask} />

                </div>
                <div className="tasks">

                    {taskData.tasks.map((data, index) =>
                        (< Task text={taskData.text} />)
                    )}

                </div>




            </div>


        </>
    )
}

export default TaskBlock