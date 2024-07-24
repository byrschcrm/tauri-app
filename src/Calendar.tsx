import "./App.css";
import { FC } from 'react';

type Props = {
    tasks: any[]
}

const Calendar: FC<Props> = (props) => {
    const { tasks } = props

    return (
        <div className="grid grid-flow-col grid-rows-10">
            <div className="flex h-10 items-center justify-end row-span-2 text-right">09:00</div>
            <div className="flex h-10 items-center justify-end row-span-2 text-right">10:00</div>
            <div className="flex h-10 items-center justify-end row-span-2 text-right">11:00</div>
            <div className="flex h-10 items-center justify-end row-span-2 text-right">12:00</div>
            <div className="flex h-10 items-center justify-end row-span-2 text-right">13:00</div>

            <div className="border border-gray-400 h-5 text-center">2024.07.21(日)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>

            <div className="border border-gray-400 h-5 text-center">2024.07.22(月)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>

            <div className="border border-gray-400 h-5 text-center">2024.07.23(火)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>

            <div className="border border-gray-400 h-5 text-center">2024.07.24(水)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>

            <div className="border border-gray-400 h-5 text-center">2024.07.25(木)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>

            <div className="border border-gray-400 h-5 text-center">2024.07.26(金)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>

            <div className="border border-gray-400 h-5 text-center">2024.07.27(土)</div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
            <div className="border border-gray-400 h-5"></div>
        </div>
    )
}

export default Calendar
