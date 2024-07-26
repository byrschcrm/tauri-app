import "./App.css";
import { FC } from 'react';
import dayjs from "dayjs";

type Props = {
    tasks: any[]
    updateTask: any
    deleteTask: any
}

const TaskList: FC<Props> = (props) => {
    const { tasks, updateTask, deleteTask } = props

    return (
        <div className="grid grid-cols-4">
            <div className="border border-gray-400 text-center">名前</div>
            <div className="border border-gray-400 text-center">開始時刻</div>
            <div className="border border-gray-400 text-center">終了時刻</div>
            <div className="border border-gray-400 text-center">削除</div>
            {
                tasks.flatMap((task) =>
                    <>
                        <div className="border border-gray-400">
                            <input className="p-0" value={task.name} onChange={(e) => updateTask({ id: task.id, name: e.target.value })} />
                        </div>
                        <div className="border border-gray-400">
                            <select onChange={(e) => updateTask({ id: task.id, start_date: dayjs(e.target.value) })}>{createDateOptions(task.start_date)}</select>
                        </div>
                        <div className="border border-gray-400">
                            <select onChange={(e) => updateTask({ id: task.id, end_date: dayjs(e.target.value) })}>{createDateOptions(task.end_date)}</select>
                        </div>
                        <div className="bg-red-500 border border-gray-400 cursor-pointer" onClick={() => deleteTask(task.id)}></div>
                    </>
                )
            }
        </div>
    )
}

const createDateOptions = (date: any) => [<option key="empty"></option>].concat(createYmdPatterns().flatMap((ymd) => createHmsPatterns().map((hms) => <option key={`${ymd}${hms}`} selected={date.isSame(`${ymd}${hms}`)}>{`${ymd} ${hms}`}</option>)))

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
    ]
}

export default TaskList
