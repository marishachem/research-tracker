export type Priority = "low" | "medium" | "high"

export interface Project {
  id: number
  name: string
  description: string
  createdAt: string
}

export interface Task {
  id: number
  projectId: number
  title: string
  done: boolean
  priority: Priority
  dueDate: string
  managerName: string
}
