import "./App.css";
import React from 'react';
import InputDate from './InputDate';
import dayjs from "dayjs";
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

type Props = {
    tasks: any[]
    ymdPatterns: string[]
    hmsPatterns: string[]
    updateTask: any
    deleteTask: any
}

const TaskList: React.FC<Props> = (props) => {
    const { tasks, ymdPatterns, hmsPatterns, updateTask, deleteTask } = props

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
            className="grid grid-cols-[1fr_2fr_3fr_3fr_1fr]"
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
                    <React.Fragment key={task.id}>
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
                            <InputDate date={task.start_date} ymdPatterns={ymdPatterns} hmsPatterns={hmsPatterns} onChange={(date) => updateTask({ id: task.id, start_date: date })} />
                        </div>
                        <div className="border border-gray-400">
                            <InputDate date={task.end_date} ymdPatterns={ymdPatterns} hmsPatterns={hmsPatterns} onChange={(date) => updateTask({ id: task.id, end_date: date })} />
                        </div>
                        <div className="bg-red-500 border border-gray-400 cursor-pointer" onClick={() => deleteTask(task.id)}></div>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default TaskList
