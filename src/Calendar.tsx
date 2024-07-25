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
            <div className="flex items-center justify-end row-span-2 text-right">09:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">10:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">11:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">12:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">13:00</div>

            <div className="border border-gray-400 text-center">2024.07.21(日)</div>
            {createCellElements(tasks, createDateRanges('2024-07-21'))}

            <div className="border border-gray-400 text-center">2024.07.22(月)</div>
            {createCellElements(tasks, createDateRanges('2024-07-22'))}

            <div className="border border-gray-400 text-center">2024.07.23(火)</div>
            {createCellElements(tasks, createDateRanges('2024-07-23'))}

            <div className="border border-gray-400 text-center">2024.07.24(水)</div>
            {createCellElements(tasks, createDateRanges('2024-07-24'))}

            <div className="border border-gray-400 text-center">2024.07.25(木)</div>
            {createCellElements(tasks, createDateRanges('2024-07-25'))}

            <div className="border border-gray-400 text-center">2024.07.26(金)</div>
            {createCellElements(tasks, createDateRanges('2024-07-26'))}

            <div className="border border-gray-400 text-center">2024.07.27(土)</div>
            {createCellElements(tasks, createDateRanges('2024-07-27'))}
        </div>
    )
}

const createCellElements = (tasks: any[], dateRanges: any) => {
    const cell_ids = dateRanges.map((dateRange: any, idx: number) => tasks.find((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to))?.id ?? -idx)

    const row_spans: any[] = []
    let prev_id = 0
    let cur_row_span = 0
    for (let i = 0; i < cell_ids.length; i++) {
        const cell_id = cell_ids[i]
        if (i === 0) {
            prev_id = cell_id
            cur_row_span = cell_id > 0 ? 1 : 0
        } else if (cell_id === prev_id) {
            cur_row_span += 1
        } else {
            row_spans.push(cur_row_span)
            prev_id = cell_id
            cur_row_span = cell_id > 0 ? 1 : 0
        }
        if (i === cell_ids.length - 1) {
            row_spans.push(cur_row_span)
        }
    }

    return row_spans.map((e) => <div className={`border border-gray-400 ${e > 0 ? `${getRowSpan(e)} bg-teal-500` : ''}`}></div>)
}

const createDateRanges = (ymd: string) => {
    return [
        { from: dayjs(`${ymd} 09:00:00`), to: dayjs(`${ymd} 09:30:00`) },
        { from: dayjs(`${ymd} 09:30:00`), to: dayjs(`${ymd} 10:00:00`) },
        { from: dayjs(`${ymd} 10:00:00`), to: dayjs(`${ymd} 10:30:00`) },
        { from: dayjs(`${ymd} 10:30:00`), to: dayjs(`${ymd} 11:00:00`) },
        { from: dayjs(`${ymd} 11:00:00`), to: dayjs(`${ymd} 11:30:00`) },
        { from: dayjs(`${ymd} 11:30:00`), to: dayjs(`${ymd} 12:00:00`) },
        { from: dayjs(`${ymd} 12:00:00`), to: dayjs(`${ymd} 12:30:00`) },
        { from: dayjs(`${ymd} 12:30:00`), to: dayjs(`${ymd} 13:00:00`) },
        { from: dayjs(`${ymd} 13:00:00`), to: dayjs(`${ymd} 13:30:00`) },
    ]
}

const getRowSpan = (num: any) => {
    switch (num) {
        case 1:
            return 'row-span-1'
        case 2:
            return 'row-span-2'
        case 3:
            return 'row-span-3'
        case 4:
            return 'row-span-4'
        case 5:
            return 'row-span-5'
        case 6:
            return 'row-span-6'
        default:
            return ''
    }
}

export default Calendar
