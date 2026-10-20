import type { Project, Task, Priority } from "./types"

function createProject(name: string, description?: string): Project{
    return {
        id: Date.now(),
        name,
        description: description ?? "No description",
        createdAt: new Date().toISOString().slice(0, 10)
    }
}

function createTask(title: string, projectId: number, priority: Priority, dueDate: string): Task{
    return {
        id: Date.now(),
        projectId,
        title,
        priority,
        dueDate,
        done: false,
    }
}

function isOverdue(task: Task): boolean {
    const today = new Date().toISOString().slice(0, 10)
    return !task.done && task.dueDate < today
}