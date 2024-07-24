import "./App.css";
import { useState } from 'react';
import Calendar from "./Calendar"
import TaskList from "./TaskList";

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
    { name: 'タスク1', start_date: '2024.07.24(水) 10:00:00', end_date: '2024.07.24(水) 10:30:00' },
    { name: 'タスク2', start_date: '2024.07.25(木) 09:00:00', end_date: '2024.07.25(木) 10:00:00' },
    { name: 'タスク3', start_date: '2024.07.25(木) 10:30:00', end_date: '2024.07.25(木) 12:00:00' },
  ]
}

export default App;
