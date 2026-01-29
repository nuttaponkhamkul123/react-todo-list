import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";

function CreateTaskBlockBtn({ onAddTaskBlockClick }) {

    const addTaskBlock = () => {
        onAddTaskBlockClick();
    }
    return (
        <div className="p-4 flex justify-center">
            <Button
                onClick={addTaskBlock}
                size="lg"
                className="w-full max-w-md text-lg gap-2 shadow-sm"
            >
                <Plus className="h-5 w-5" />
                Create Task Block
            </Button>
        </div>
    )
}
// End of component

export default CreateTaskBlockBtn;