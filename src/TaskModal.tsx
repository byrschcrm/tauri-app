import "./App.css";
import { FC } from 'react';

type Props = {
    isOpen: boolean
    onClose: () => void
}

const TaskModal: FC<Props> = (props) => {
    const { isOpen, onClose } = props

    return (
        <div
            className={`flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 overflow-hidden ${isOpen ? '' : 'hidden'}`}
            onClick={onClose}
        >
            <div
                className="divide-y divide-gray-300 p-2 bg-white rounded"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between pb-2">
                    <div className="mt-2">タスク登録</div>
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
                            <input className="p-0" />
                        </div>
                        <div className="border border-gray-400">
                            <select></select>
                        </div>
                        <div className="border border-gray-400">
                            <select></select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="text-white bg-blue-500">登録</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskModal
