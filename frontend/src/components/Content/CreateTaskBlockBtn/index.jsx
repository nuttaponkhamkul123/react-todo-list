import './style.css';


function CreateTaskBlockBtn({ onAddTaskBlockClick }) {

    const addTaskBlock = () => {
        onAddTaskBlockClick();
    }
    return (
        <>
            <button className="create-task-block-btn" onClick={addTaskBlock}>Create task block</button>


        </>
    )
}
export default CreateTaskBlockBtn;