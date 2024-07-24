import "./App.css";
import { FC } from 'react';

type Props = {
    data: any[]
    isEditable: boolean
}

const TaskList: FC<Props> = (props) => {
    const { data } = props

    return (
        <div className="grid grid-cols-3">
            <div className="border border-gray-400 h-5 text-center">名前</div>
            <div className="border border-gray-400 h-5 text-center">開始時刻</div>
            <div className="border border-gray-400 h-5 text-center">終了時刻</div>
            {
                data.flatMap((d) =>
                    <>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{d.name}</div>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{d.start_date}</div>
                        <div className="border border-gray-400 h-5" contentEditable={true}>{d.end_date}</div>
                    </>
                )
            }
        </div>
    )
}

export default TaskList
