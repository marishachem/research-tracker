import type { Task } from "../types"
import { isOverdue } from "../utils"

interface Props {
    task: Task
}

function TaskCard({ task }: Props) {
    const overdue = isOverdue(task)
    return (
        <div>
            <h3>{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p>Due: {task.dueDate}</p>
            <p>{task.done ? "✅ Done" : "⬜ Not done"}</p>
            {overdue && <p style={{ color: "red" }}>Overdue</p>}
            <p>Manager: {task.managerName}</p>
        </div>
    )
}

export default TaskCard