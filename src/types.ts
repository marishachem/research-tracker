type Priority = "low" | "medium" | "high"

interface Project {
  id: number
  name: string
  description: string
  createdAt: string
}

interface Task {
  id: number
  projectId: number
  title: string
  done: boolean
  priority: Priority
  dueDate: string
}
