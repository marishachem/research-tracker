import { useState } from "react"
import type { Task } from "../types"
import { createTask } from "../utils"
import TaskCard from "./TaskCard"

function ProjectBoard() {
    const [tasks, setTasks] = useState<Task[]>([])

    function addTask() {
        // create a task and add it to state
        const newTask = createTask("Run experiment", 1, "high", "2026-10-25", "Иванов ИИ")
        setTasks([...tasks, newTask]);
    }

    return (
        <div>
            <button onClick={addTask}>Add sample task</button>
            {tasks.length === 0 && <p>No tasks yet</p>}
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}

        </div>
    )
}

export default ProjectBoard