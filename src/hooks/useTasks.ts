import { useState, useEffect } from "react"
import type { Task, Priority } from "../types"
import { createTask } from "../utils"


export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    function addTask(title: string, priority: Priority, dueDate: string) {
        const newTask = createTask(title, 1, priority, dueDate, "Иванов ИИ")
        setTasks([...tasks, newTask])
    }

    function toggleDone(id: number) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ))
    }

    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return { tasks, addTask, toggleDone, deleteTask }
}