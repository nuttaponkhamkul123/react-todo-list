import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";

function CreateTaskBtn({ onAddTask }) {

    const addTask = () => {
        onAddTask();
    }
    return (
        <Button
            onClick={addTask}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-green-100 dark:hover:bg-green-900 text-green-600"
        >
            <Plus className="h-5 w-5" />
        </Button>
    )
}

export default CreateTaskBtn;