import type { Project, Task, Priority } from "./types"

export function createProject(name: string, description?: string): Project{
    return {
        id: Date.now(),
        name,
        description: description ?? "No description",
        createdAt: new Date().toISOString().slice(0, 10)
    }
}

export function createTask(title: string, projectId: number, priority: Priority, dueDate: string,managerName:string): Task{
    return {
        id: Date.now(),
        projectId,
        title,
        priority,
        dueDate,
        done: false,
        managerName,
    }
}

export function isOverdue(task: Task): boolean {
    const today = new Date().toISOString().slice(0, 10)
    return !task.done && task.dueDate < today
}