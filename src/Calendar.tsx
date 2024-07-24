import "./App.css";
import { FC } from 'react';
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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
            {
                [
                    { from_date: '2024-07-21 09:00:00', to_date: '2024-07-21 09:30:00' },
                    { from_date: '2024-07-21 09:30:00', to_date: '2024-07-21 10:00:00' },
                    { from_date: '2024-07-21 10:00:00', to_date: '2024-07-21 10:30:00' },
                    { from_date: '2024-07-21 10:30:00', to_date: '2024-07-21 11:00:00' },
                    { from_date: '2024-07-21 11:00:00', to_date: '2024-07-21 11:30:00' },
                    { from_date: '2024-07-21 11:30:00', to_date: '2024-07-21 12:00:00' },
                    { from_date: '2024-07-21 12:00:00', to_date: '2024-07-21 12:30:00' },
                    { from_date: '2024-07-21 12:30:00', to_date: '2024-07-21 13:00:00' },
                    { from_date: '2024-07-21 13:00:00', to_date: '2024-07-21 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }

            <div className="border border-gray-400 h-5 text-center">2024.07.22(月)</div>
            {
                [
                    { from_date: '2024-07-22 09:00:00', to_date: '2024-07-22 09:30:00' },
                    { from_date: '2024-07-22 09:30:00', to_date: '2024-07-22 10:00:00' },
                    { from_date: '2024-07-22 10:00:00', to_date: '2024-07-22 10:30:00' },
                    { from_date: '2024-07-22 10:30:00', to_date: '2024-07-22 11:00:00' },
                    { from_date: '2024-07-22 11:00:00', to_date: '2024-07-22 11:30:00' },
                    { from_date: '2024-07-22 11:30:00', to_date: '2024-07-22 12:00:00' },
                    { from_date: '2024-07-22 12:00:00', to_date: '2024-07-22 12:30:00' },
                    { from_date: '2024-07-22 12:30:00', to_date: '2024-07-22 13:00:00' },
                    { from_date: '2024-07-22 13:00:00', to_date: '2024-07-22 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }

            <div className="border border-gray-400 h-5 text-center">2024.07.23(火)</div>
            {
                [
                    { from_date: '2024-07-23 09:00:00', to_date: '2024-07-23 09:30:00' },
                    { from_date: '2024-07-23 09:30:00', to_date: '2024-07-23 10:00:00' },
                    { from_date: '2024-07-23 10:00:00', to_date: '2024-07-23 10:30:00' },
                    { from_date: '2024-07-23 10:30:00', to_date: '2024-07-23 11:00:00' },
                    { from_date: '2024-07-23 11:00:00', to_date: '2024-07-23 11:30:00' },
                    { from_date: '2024-07-23 11:30:00', to_date: '2024-07-23 12:00:00' },
                    { from_date: '2024-07-23 12:00:00', to_date: '2024-07-23 12:30:00' },
                    { from_date: '2024-07-23 12:30:00', to_date: '2024-07-23 13:00:00' },
                    { from_date: '2024-07-23 13:00:00', to_date: '2024-07-23 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }

            <div className="border border-gray-400 h-5 text-center">2024.07.24(水)</div>
            {
                [
                    { from_date: '2024-07-24 09:00:00', to_date: '2024-07-24 09:30:00' },
                    { from_date: '2024-07-24 09:30:00', to_date: '2024-07-24 10:00:00' },
                    { from_date: '2024-07-24 10:00:00', to_date: '2024-07-24 10:30:00' },
                    { from_date: '2024-07-24 10:30:00', to_date: '2024-07-24 11:00:00' },
                    { from_date: '2024-07-24 11:00:00', to_date: '2024-07-24 11:30:00' },
                    { from_date: '2024-07-24 11:30:00', to_date: '2024-07-24 12:00:00' },
                    { from_date: '2024-07-24 12:00:00', to_date: '2024-07-24 12:30:00' },
                    { from_date: '2024-07-24 12:30:00', to_date: '2024-07-24 13:00:00' },
                    { from_date: '2024-07-24 13:00:00', to_date: '2024-07-24 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }

            <div className="border border-gray-400 h-5 text-center">2024.07.25(木)</div>
            {
                [
                    { from_date: '2024-07-25 09:00:00', to_date: '2024-07-25 09:30:00' },
                    { from_date: '2024-07-25 09:30:00', to_date: '2024-07-25 10:00:00' },
                    { from_date: '2024-07-25 10:00:00', to_date: '2024-07-25 10:30:00' },
                    { from_date: '2024-07-25 10:30:00', to_date: '2024-07-25 11:00:00' },
                    { from_date: '2024-07-25 11:00:00', to_date: '2024-07-25 11:30:00' },
                    { from_date: '2024-07-25 11:30:00', to_date: '2024-07-25 12:00:00' },
                    { from_date: '2024-07-25 12:00:00', to_date: '2024-07-25 12:30:00' },
                    { from_date: '2024-07-25 12:30:00', to_date: '2024-07-25 13:00:00' },
                    { from_date: '2024-07-25 13:00:00', to_date: '2024-07-25 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }

            <div className="border border-gray-400 h-5 text-center">2024.07.26(金)</div>
            {
                [
                    { from_date: '2024-07-26 09:00:00', to_date: '2024-07-26 09:30:00' },
                    { from_date: '2024-07-26 09:30:00', to_date: '2024-07-26 10:00:00' },
                    { from_date: '2024-07-26 10:00:00', to_date: '2024-07-26 10:30:00' },
                    { from_date: '2024-07-26 10:30:00', to_date: '2024-07-26 11:00:00' },
                    { from_date: '2024-07-26 11:00:00', to_date: '2024-07-26 11:30:00' },
                    { from_date: '2024-07-26 11:30:00', to_date: '2024-07-26 12:00:00' },
                    { from_date: '2024-07-26 12:00:00', to_date: '2024-07-26 12:30:00' },
                    { from_date: '2024-07-26 12:30:00', to_date: '2024-07-26 13:00:00' },
                    { from_date: '2024-07-26 13:00:00', to_date: '2024-07-26 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }

            <div className="border border-gray-400 h-5 text-center">2024.07.27(土)</div>
            {
                [
                    { from_date: '2024-07-27 09:00:00', to_date: '2024-07-27 09:30:00' },
                    { from_date: '2024-07-27 09:30:00', to_date: '2024-07-27 10:00:00' },
                    { from_date: '2024-07-27 10:00:00', to_date: '2024-07-27 10:30:00' },
                    { from_date: '2024-07-27 10:30:00', to_date: '2024-07-27 11:00:00' },
                    { from_date: '2024-07-27 11:00:00', to_date: '2024-07-27 11:30:00' },
                    { from_date: '2024-07-27 11:30:00', to_date: '2024-07-27 12:00:00' },
                    { from_date: '2024-07-27 12:00:00', to_date: '2024-07-27 12:30:00' },
                    { from_date: '2024-07-27 12:30:00', to_date: '2024-07-27 13:00:00' },
                    { from_date: '2024-07-27 13:00:00', to_date: '2024-07-27 13:30:00' },
                ].map((dates) => <div className={`border border-gray-400 h-5 ${tasks.some((task) => task.start_date?.isSameOrBefore(dayjs(dates.from_date)) && task.end_date?.isSameOrAfter(dayjs(dates.to_date))) ? 'bg-teal-500' : ''}`}></div>)
            }
        </div>
    )
}

export default Calendar
