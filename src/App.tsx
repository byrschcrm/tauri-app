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
      <Calendar />
      <div >
        TaskList
      </div>
      <TaskList tasks={tasks} isEditable={true} />
    </>
  );
}

const getTasks = () => {
  return [
    { name: 'タスク1', start_date: dayjs('2024-07-24 10:00:00'), end_date: dayjs('2024-07-25 10:30:00') },
    { name: 'タスク2', start_date: dayjs('2024-07-25 09:00:00'), end_date: dayjs('2024-07-25 10:00:00') },
    { name: 'タスク3', start_date: dayjs('2024-07-25 10:30:00'), end_date: dayjs('2024-07-25 12:00:00') },
  ]
}

export default App;
