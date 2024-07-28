import "./App.css";
import { FC } from 'react';
import dayjs from "dayjs";
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

type Props = {
    tasks: any[]
    datePatterns: string[]
    updateTask: any
    deleteTask: any
}

const TaskList: FC<Props> = (props) => {
    const { tasks, datePatterns, updateTask, deleteTask } = props

    const dragStart = (e: any, task: any) => {
        e.dataTransfer.setData('text', JSON.stringify({ task }))
    }

    const drop = (e: any) => {
        const { task, grasp_no } = JSON.parse(e.dataTransfer.getData('text'))
        if (grasp_no !== undefined) {
            updateTask({ id: task.id, start_date: null, end_date: null })
        }
    }

    return (
        <div
            className="grid grid-cols-5"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => drop(e)}
        >
            <div className="border border-gray-400 text-center">割付状況</div>
            <div className="border border-gray-400 text-center">名前</div>
            <div className="border border-gray-400 text-center">開始時刻</div>
            <div className="border border-gray-400 text-center">終了時刻</div>
            <div className="border border-gray-400 text-center">削除</div>
            {
                tasks.flatMap((task) =>
                    <>
                        <div
                            className={`border border-gray-400 ${task.start_date && task.end_date ? '' : 'bg-teal-500 cursor-pointer'}`}
                            draggable={!(task.start_date && task.end_date)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragStart={(e) => dragStart(e, task)}
                        ></div>
                        <div className="border border-gray-400">
                            <input className="p-0" value={task.name} onChange={(e) => updateTask({ id: task.id, name: e.target.value })} />
                        </div>
                        <div className="border border-gray-400">
                            <select onChange={(e) => updateTask({ id: task.id, start_date: e.target.value ? dayjs(e.target.value) : null })}>
                                {datePatterns.map((dp) => <option key={dp} selected={task.start_date?.isSame(dp)}>{dp}</option>)}
                            </select>
                        </div>
                        <div className="border border-gray-400">
                            <select onChange={(e) => updateTask({ id: task.id, end_date: e.target.value ? dayjs(e.target.value) : null })}>
                                {datePatterns.map((dp) => <option key={dp} selected={task.end_date?.isSame(dp)}>{dp}</option>)}
                            </select>
                        </div>
                        <div className="bg-red-500 border border-gray-400 cursor-pointer" onClick={() => deleteTask(task.id)}></div>
                    </>
                )
            }
        </div>
    )
}

export default TaskList
