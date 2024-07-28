import "./App.css";
import { useEffect, useState } from 'react';
import Calendar from "./Calendar"
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import dayjs from "dayjs";

function App() {
  const [tasks, setTasks] = useState<any[]>(getTasks())
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(dayjs('2024-07-21'))

  const addTask = (partTask: any) => {
    setTasks((prevTasks) => {
      const new_id = prevTasks.reduce((id, task) => id >= task.id ? id : task.id, 0) + 1
      return prevTasks.concat([{ id: new_id, ...partTask }])
    })
  }

  const updateTask = (partTask: any) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => task.id === partTask.id ? { ...task, ...partTask } : task)
    })
  }

  const deleteTask = (id: any) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id)
    })
  }

  const addFromDate = (diff: number) => {
    setFromDate((prevFromDate) => prevFromDate.add(diff * 7, 'd'))
  }

  const emptyModalTask = { name: '', start_date: null, end_date: null }
  const [modalTask, setModalTask] = useState(emptyModalTask)
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false)

  // useEffect(() => {
  //   document.body.style.overflow = "hidden"
  // }, [])

  const [debug, setDebug] = useState<any>(null)

  return (
    <>
      <div>
        Calendar
      </div>
      <Calendar tasks={tasks} fromDate={fromDate} addFromDate={addFromDate} updateTask={updateTask} setDebug={setDebug} />
      <div>
        TaskList
      </div>
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <div className="flex justify-end">
        <button className="text-white bg-blue-500" onClick={() => setIsOpenTaskModal(true)}>登録</button>
      </div>
      <TaskModal
        isOpen={isOpenTaskModal}
        task={modalTask}
        onEdit={(task) => {
          setModalTask(task)
        }}
        onOk={() => {
          addTask(modalTask)
          setModalTask(emptyModalTask)
          setIsOpenTaskModal(false)
        }}
        onClose={() => {
          setModalTask(emptyModalTask)
          setIsOpenTaskModal(false)
        }}
      />
      <div>
        Debug: {debug}
      </div>
    </>
  );
}

const getTasks = () => {
  return [
    { id: 1, name: 'タスク1', start_date: dayjs('2024-07-22 10:00:00'), end_date: dayjs('2024-07-22 10:30:00') },
    { id: 2, name: 'タスク2', start_date: dayjs('2024-07-24 09:00:00'), end_date: dayjs('2024-07-24 10:00:00') },
    { id: 3, name: 'タスク3', start_date: dayjs('2024-07-27 11:30:00'), end_date: dayjs('2024-07-27 13:00:00') },
    { id: 4, name: 'task1', start_date: dayjs('2024-07-25 09:00:00'), end_date: dayjs('2024-07-25 09:30:00') },
    { id: 5, name: 'task2', start_date: dayjs('2024-07-25 10:00:00'), end_date: dayjs('2024-07-25 11:30:00') },
    { id: 6, name: 'task3', start_date: dayjs('2024-07-25 10:30:00'), end_date: dayjs('2024-07-25 11:00:00') },
    { id: 7, name: 'task4', start_date: dayjs('2024-07-25 11:00:00'), end_date: dayjs('2024-07-25 12:00:00') },
    { id: 8, name: 'タスク4', start_date: null, end_date: null },
  ]
}

export default App;
