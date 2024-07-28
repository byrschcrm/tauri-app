import "./App.css";
import { FC } from 'react';
import InputDate from './InputDate';
import Modal from "./Modal";
import dayjs from "dayjs";
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

type Props = {
    title: string
    task: any
    ymdPatterns: string[]
    hmsPatterns: string[]
    isOpen: boolean
    onEdit: (task: any) => void
    onOk: () => void
    onClose: () => void
}

const TaskModal: FC<Props> = (props) => {
    const { title, task, ymdPatterns, hmsPatterns, isOpen, onEdit, onOk, onClose } = props

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div
                className="divide-y divide-gray-300 p-2 bg-white rounded"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between pb-2">
                    <div className="mt-2">{title}</div>
                    <button className="pt-1 pb-1 pl-3 pr-3" onClick={onClose}>×</button>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <div
                        className="grid grid-cols-3"
                    >
                        <div className="border border-gray-400 text-center bg-slate-200">名前</div>
                        <div className="border border-gray-400 text-center bg-slate-200">開始時刻</div>
                        <div className="border border-gray-400 text-center bg-slate-200">終了時刻</div>
                        <div className="border border-gray-400">
                            <input className="p-0" value={task?.name} onChange={(e) => onEdit({ ...task, name: e.target.value })} />
                        </div>
                        <div className="border border-gray-400">
                            <InputDate date={task.start_date} ymdPatterns={ymdPatterns} hmsPatterns={hmsPatterns} onChange={(date) => onEdit({ ...task, start_date: date })} />
                        </div>
                        <div className="border border-gray-400">
                            <InputDate date={task.end_date} ymdPatterns={ymdPatterns} hmsPatterns={hmsPatterns} onChange={(date) => onEdit({ ...task, end_date: date })} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-1">
                        <button className="text-white bg-gray-500" onClick={onClose}>キャンセル</button>
                        <button className="text-white bg-blue-500" onClick={onOk}>OK</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default TaskModal
