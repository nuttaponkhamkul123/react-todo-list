import './style.css';
import { Button } from "@/components/ui/button"



function CreateTaskBlockBtn({ onAddTaskBlockClick }) {

    const addTaskBlock = () => {
        onAddTaskBlockClick();
    }
    return (
        <>
            <Button onClick={addTaskBlock}>Create task block</Button>
            {/* <button className="create-task-block-btn" onClick={addTaskBlock}>Create task block</button> */}


        </>
    )
}
export default CreateTaskBlockBtn;