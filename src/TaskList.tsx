import "./App.css";
import { FC } from 'react';

type Props = {
    tasks: any[]
}

const TaskList: FC<Props> = (props) => {
    const { tasks } = props

    return (
        <div className="grid grid-cols-3">
            <div className="border border-gray-400 h-5 text-center">名前</div>
            <div className="border border-gray-400 h-5 text-center">開始時刻</div>
            <div className="border border-gray-400 h-5 text-center">終了時刻</div>
            {
                tasks.flatMap((t) =>
                    <>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{t.name}</div>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{t.start_date.format("YYYY-MM-DD HH:mm:ss")}</div>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{t.end_date.format("YYYY-MM-DD HH:mm:ss")}</div>
                    </>
                )
            }
        </div>
    )
}

export default TaskList
