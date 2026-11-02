import { useState, useEffect } from "react"
import type { Task, Priority } from "../types"
import { createTask } from "../utils"
import TaskCard from "./TaskCard"

function ProjectBoard() {

    //Lazy initial state loading from localStorage
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks")
        return saved ? JSON.parse(saved) : []
    })

    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState<Priority>("medium")
    const [dueDate, setdueDate] = useState("")


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()   // stops page from refreshing
        if (!title.trim()) return  // don't add empty tasks
        const newTask = createTask(title, 1, priority, dueDate, "Иванов ИИ")
        setTasks([...tasks, newTask])
        setTitle("")   // clear the input after adding
        setdueDate("")
    }

    function toggleDone(id: number) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ))
    }

    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const [filter, setFilter] = useState<"all" | "active" | "done">("all")

    const visibleTasks = tasks.filter(task => {
        if (filter === "active") return !task.done
        if (filter === "done") return task.done
        return true  // "all"
    })


    //useEffect saving on every tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
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
                <TaskCard key={task.id} task={task}  onToggle={toggleDone} onDelete={deleteTask}/>
            ))}
        </div>
    )
}

export default ProjectBoard