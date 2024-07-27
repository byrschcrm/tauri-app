import "./App.css";
import { FC } from 'react';
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
    tasks: any[]
    updateTask: any
    setDebug: any
}

const Calendar: FC<Props> = (props) => {
    const { tasks, updateTask, setDebug } = props

    const funcA = (e: any, task: any, no: any, span: any) => {
        const start_no = no + Math.floor(e.nativeEvent.offsetY / (e.currentTarget.clientHeight / span))
        e.dataTransfer.setData('text', JSON.stringify({ task, start_no }))
    }

    const funcB = (e: any, no: any) => {
        const { task, start_no } = JSON.parse(e.dataTransfer.getData('text'))
        const end_no = no
        const add_minutes = (end_no - start_no) * 30
        const after_start_date = dayjs(task.start_date).add(add_minutes, 'm')
        const after_end_date = dayjs(task.end_date).add(add_minutes, 'm')
        updateTask({ id: task.id, start_date: after_start_date, end_date: after_end_date })
    }

    return (
        <div className="grid grid-flow-col grid-rows-10">
            <div className="flex items-center justify-end row-span-2 text-right">09:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">10:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">11:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">12:00</div>
            <div className="flex items-center justify-end row-span-2 text-right">13:00</div>

            <div className="border border-gray-400 text-center">2024.07.21(日)</div>
            {createCellElements(tasks, createDateRanges('2024-07-21'), 9 * 0 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.22(月)</div>
            {createCellElements(tasks, createDateRanges('2024-07-22'), 9 * 1 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.23(火)</div>
            {createCellElements(tasks, createDateRanges('2024-07-23'), 9 * 2 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.24(水)</div>
            {createCellElements(tasks, createDateRanges('2024-07-24'), 9 * 3 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.25(木)</div>
            {createCellElements(tasks, createDateRanges('2024-07-25'), 9 * 4 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.26(金)</div>
            {createCellElements(tasks, createDateRanges('2024-07-26'), 9 * 5 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.27(土)</div>
            {createCellElements(tasks, createDateRanges('2024-07-27'), 9 * 6 + 1, funcA, funcB)}
        </div>
    )
}

const createCellElements = (tasks: any[], dateRanges: any, start_no: number, funcA: any, funcB: any) => {
    // task1, null, null, task2, task2, null, ...
    const aaa = dateRanges.map((dateRange: any) => {
        return tasks.find((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to)) ?? null
    })

    // { task1, span: 1 }, { null, span: 1 }, { null, span: 1 }, { task2, span: 2 }, { null, span: 1 }, ...
    const bbb: any[] = []
    let prevA = null
    let cur_span = 0
    for (let i = 0; i < aaa.length; i++) {
        const a = aaa[i]
        if (i === 0) {
            prevA = a
            cur_span = 1
        } else if (a !== null && prevA !== null && a.id === prevA.id) {
            cur_span += 1
        } else {
            bbb.push({ task: prevA, span: cur_span })
            prevA = a
            cur_span = 1
        }
        if (i === aaa.length - 1) {
            bbb.push({ task: prevA, span: cur_span })
        }
    }

    // { task1, span: 1, no: 1 }, { null, span: 1, no: 2 }, { null, span: 1, no: 3 }, { task2, span: 2, no: 4 }, { null, span: 1, no: 6 }, ...
    const ccc: any[] = []
    let cur_no = start_no
    for (let i = 0; i < bbb.length; i++) {
        const b = bbb[i]
        ccc.push({ ...b, no: cur_no })
        cur_no += b.span
    }

    return ccc.map((c) =>
        <div
            className={`border border-gray-400 flex items-center justify-center ${getRowSpan(c.span)} ${c.task ? 'bg-teal-500 cursor-pointer' : ''}`}
            draggable={c.task !== null}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => funcA(e, c.task, c.no, c.span)}
            onDrop={(e) => funcB(e, c.no)}
        >
            {c.task?.name}
        </div>
    )
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
