import "./App.css";
import { useState } from 'react';
import Calendar from "./Calendar"
import TaskList from "./TaskList";
import dayjs from "dayjs";

function App() {
  const [tasks, setTasks] = useState(getTasks())

  return (
    <>
      <div >
        Calendar
      </div>
      <Calendar tasks={tasks} />
      <div >
        TaskList
      </div>
      <TaskList tasks={tasks} />
    </>
  );
}

const getTasks = () => {
  return [
    { name: 'タスク1', start_date: dayjs('2024-07-22 10:00:00'), end_date: dayjs('2024-07-22 10:30:00') },
    { name: 'タスク2', start_date: dayjs('2024-07-24 09:00:00'), end_date: dayjs('2024-07-24 10:00:00') },
    { name: 'タスク3', start_date: dayjs('2024-07-27 11:30:00'), end_date: dayjs('2024-07-27 13:00:00') },
  ]
}

export default App;
