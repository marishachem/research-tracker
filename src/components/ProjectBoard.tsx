import { useState, useEffect } from "react"
import type { Task } from "../types"
import { createTask } from "../utils"
import TaskCard from "./TaskCard"

function ProjectBoard() {

    //Lazy initial state loading from localStorage
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks")
        return saved ? JSON.parse(saved) : []
    })

    function addTask() {
        const newTask = createTask("Run experiment", 1, "high", "2026-10-25", "Иванов ИИ")
        setTasks([...tasks, newTask]);
    }
    //useEffect saving on every tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

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