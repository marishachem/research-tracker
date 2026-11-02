import type { Task } from "../types"
import { isOverdue } from "../utils"
import crossIcon from "../assets/cross.svg"

interface Props {
    task: Task
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

function TaskCard({ task, onToggle, onDelete }: Props) {
    const overdue = isOverdue(task)
    return (
        <div>
            <h3>{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p>Due: {task.dueDate}</p>
            <p>{task.done ? "✅ Done" : <img src={crossIcon} width={16} height={16} alt="not done" />} </p>
            {overdue && <p style={{ color: "red" }}>Overdue</p>}
            <p>Manager: {task.managerName}</p>
            <button onClick={() => onToggle(task.id)}>Toggle done</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    )
}

export default TaskCard