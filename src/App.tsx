import { Fragment, FC, useState } from 'react';


let id = 0
const makeId = () => ++id

type Status = "todo" | "doing" | "done"

interface Task {
  id: number
  desc: string
  status: Status
}

interface BaseTaskProp {
  onChange: (id: number, status: Status) => void
  remove: (id: number) => void
}

interface TaskItemProps extends BaseTaskProp {
  task: Task

}
interface TaskListProps extends BaseTaskProp {
  tasks: Task[]
  status: string
}
const TaskItem: FC<TaskItemProps> = ({ task, onChange, remove }) => <li>
  {task.desc}
  <button onClick={() => onChange(task.id, "todo")}>todo</button>
  <button onClick={() => onChange(task.id, "doing")}>doing</button>
  <button onClick={() => onChange(task.id, "done")}>done</button>
  <button onClick={() => remove(task.id)}>remove</button>
</li>

const TaskList: FC<TaskListProps> = ({ tasks, onChange, remove, status }) => <ul>
  {tasks.filter(t => t.status === status).map(task =>
    <TaskItem
      key={task.id}
      task={task}
      onChange={onChange}
      remove={remove} />
  )}
</ul>

const ToDo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: makeId(), desc: "first", status: "todo" },
    { id: makeId(), desc: "second", status: "doing" },
    { id: makeId(), desc: "third", status: "done" }])

  const [taskInp, setTaskInp] = useState("")

  const handlerChange = (event: any) => {
    setTaskInp(event.target.value)
  }

  const addTask = (newTask: any) => {
    setTasks([...tasks, { id: makeId(), desc: newTask, status: "todo" }])
  }

  const handlerSubmit = (event: any) => {
    event.preventDefault()
    const newTask = taskInp
    setTaskInp("")
    if (!newTask)
      return alert("You must write something!")
    addTask(newTask)
  }

  const onChange = (id: number, newStatus: Status) => {
    setTasks(tasks.map(task => {
      if (task.id !== id) return task
      return { ...task, status: newStatus }
    }))
  }

  const remove = (id: number) => {
    setTasks(tasks.filter(t => id !== t.id))
  }

  return <>
    <form onSubmit={handlerSubmit}>
      <input value={taskInp} onChange={handlerChange} />
      <input value="add" type="submit" />
    </form>
    {(["todo", "doing", "done"] as Status[]).map(status => <Fragment key={status}>
      <h1>{status}</h1>
      <TaskList
        tasks={tasks}
        onChange={onChange}
        remove={remove}
        status={status} />
    </Fragment>)}

  </>;

}

export default ToDo
