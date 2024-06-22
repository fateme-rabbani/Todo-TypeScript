import React, { useState, ChangeEvent, FormEvent } from "react";

interface Task {
  id: number;
  desc: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  changeStatus: (id: number, status: string) => void;
  removeTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, changeStatus, removeTask }) => (
  <li key={task.id}>
    {task.desc}
    <button onClick={() => changeStatus(task.id, "todo")}>todo</button>
    <button onClick={() => changeStatus(task.id, "doing")}>doing</button>
    <button onClick={() => changeStatus(task.id, "done")}>done</button>
    <button onClick={() => removeTask(task.id)}>remove</button>
  </li>
);

interface TaskListProps {
  tasks: Task[];
  status: string;
  changeStatus: (id: number, status: string) => void;
  removeTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, status, changeStatus, removeTask }) => (
  <ul>
    {tasks
      .filter((t) => t.status === status)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          changeStatus={changeStatus}
          removeTask={removeTask}
        />
      ))}
  </ul>
);

let id = 0;
const makeId = () => id++;

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: makeId(), desc: "first", status: "todo" },
    { id: makeId(), desc: "second", status: "doing" },
    { id: makeId(), desc: "third", status: "done" },
  ]);
  const [taskInp, setTaskInp] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskInp(event.target.value);
  };

  const addTask = (newTask: string) => {
    setTasks([...tasks, { id: makeId(), desc: newTask, status: "todo" }]);
    setTaskInp("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newTask = taskInp;
    if (!newTask) return alert("You must write something!");
    addTask(newTask);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => id !== t.id));
  };

  const changeStatus = (id: number, newStatus: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;
        return { ...task, status: newStatus };
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={taskInp} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form>
      {["todo", "doing", "done"].map((status) => (
        <div key={status}>
          <h1>{status}</h1>
          <TaskList
            tasks={tasks}
            status={status}
            changeStatus={changeStatus}
            removeTask={removeTask}
          />
        </div>
      ))}
    </div>
  );
};

export default Todo;