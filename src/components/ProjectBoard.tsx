import { useState } from "react"
import type { Priority } from "../types"
import { useTasks } from "../hooks/useTasks"
import TaskCard from "./TaskCard"

function ProjectBoard() {
    const { tasks, addTask, toggleDone, deleteTask } = useTasks()

    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState<Priority>("medium")
    const [dueDate, setdueDate] = useState("")
    const [filter, setFilter] = useState<"all" | "active" | "done">("all")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!title.trim()) return
        addTask(title, priority, dueDate)
        setTitle("")
        setdueDate("")
    }

    const visibleTasks = tasks.filter(task => {
        if (filter === "active") return !task.done
        if (filter === "done") return task.done
        return true
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
                <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="date" value={dueDate} onChange={(e) => setdueDate(e.target.value)} />
                <button type="submit">Add task</button>
            </form>

            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("done")}>Done</button>

            {tasks.length === 0 && <p>No tasks yet</p>}
            {visibleTasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleDone} onDelete={deleteTask} />
            ))}
        </div>
    )
}

export default ProjectBoard