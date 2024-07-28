import "./App.css";
import { useState } from 'react';
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

  const emptyModalTask = { id: 0, name: '', start_date: null, end_date: null }

  const [addModalTask, setAddModalTask] = useState(emptyModalTask)
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false)

  const [editModalTask, setEditModalTask] = useState(emptyModalTask)
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false)
  const openEditTaskModal = (task: any) => {
    setEditModalTask(task)
    setIsOpenEditTaskModal(true)
  }

  const [debug, setDebug] = useState<any>(null)

  return (
    <>
      <div>
        Calendar
      </div>
      <Calendar tasks={tasks} fromDate={fromDate} addFromDate={addFromDate} updateTask={updateTask} openEditTaskModal={openEditTaskModal} setDebug={setDebug} />
      <div>
        TaskList
      </div>
      <TaskList tasks={tasks} datePatterns={createDatePatterns()} updateTask={updateTask} deleteTask={deleteTask} />
      <div className="flex justify-end">
        <button className="text-white bg-blue-500" onClick={() => setIsOpenAddTaskModal(true)}>登録</button>
      </div>
      <TaskModal
        title="タスク登録"
        task={addModalTask}
        datePatterns={createDatePatterns()}
        isOpen={isOpenAddTaskModal}
        onEdit={(task) => {
          setAddModalTask(task)
        }}
        onOk={() => {
          addTask(addModalTask)
          setAddModalTask(emptyModalTask)
          setIsOpenAddTaskModal(false)
        }}
        onClose={() => {
          setAddModalTask(emptyModalTask)
          setIsOpenAddTaskModal(false)
        }}
      />
      <TaskModal
        title="タスク編集"
        task={editModalTask}
        datePatterns={createDatePatterns()}
        isOpen={isOpenEditTaskModal}
        onEdit={(task) => {
          setEditModalTask(task)
        }}
        onOk={() => {
          updateTask(editModalTask)
          setEditModalTask(emptyModalTask)
          setIsOpenEditTaskModal(false)
        }}
        onClose={() => {
          setEditModalTask(emptyModalTask)
          setIsOpenEditTaskModal(false)
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

const createDatePatterns = () => [''].concat(createYmdPatterns().flatMap((ymd) => createHmsPatterns().map((hms) => `${ymd} ${hms}`)))

const createYmdPatterns = () => {
  return [
    '2024-07-21',
    '2024-07-22',
    '2024-07-23',
    '2024-07-24',
    '2024-07-25',
    '2024-07-26',
    '2024-07-27',
  ]
}

const createHmsPatterns = () => {
  return [
    '09:00:00',
    '09:30:00',
    '10:00:00',
    '10:30:00',
    '11:00:00',
    '11:30:00',
    '12:00:00',
    '12:30:00',
    '13:00:00',
    '13:30:00',
    '14:00:00',
    '14:30:00',
    '15:00:00',
    '15:30:00',
    '16:00:00',
    '16:30:00',
    '17:00:00',
    '17:30:00',
  ]
}

export default App;
