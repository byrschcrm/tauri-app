import "./App.css";
import { FC } from 'react';

type Props = {
    tasks: any[]
    deleteTask: any
}

const TaskList: FC<Props> = (props) => {
    const { tasks, deleteTask } = props

    return (
        <div className="grid grid-cols-4">
            <div className="border border-gray-400 h-5 text-center">名前</div>
            <div className="border border-gray-400 h-5 text-center">開始時刻</div>
            <div className="border border-gray-400 h-5 text-center">終了時刻</div>
            <div className="border border-gray-400 h-5 text-center">削除</div>
            {
                tasks.flatMap((task) =>
                    <>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{task.name}</div>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{task.start_date.format("YYYY-MM-DD HH:mm:ss")}</div>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{task.end_date.format("YYYY-MM-DD HH:mm:ss")}</div>
                        <div className="bg-red-500 border border-gray-400 cursor-pointer h-5" onClick={() => deleteTask(task.id)}></div>
                    </>
                )
            }
        </div>
    )
}

export default TaskList
