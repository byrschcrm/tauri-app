import "./App.css";
import React from 'react';
import * as cm from "./Common"
import { Task, PartTask, FixedTask } from "./Common"
import dayjs from "dayjs";
import ja from 'dayjs/locale/ja';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.locale(ja);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DateType = {
    Start: 1,
    End: 2,
} as const
type DateType = typeof DateType[keyof typeof DateType]

type DateRange = {
    from: dayjs.Dayjs
    to: dayjs.Dayjs
}

type Props = {
    tasks: Task[]
    fromDate: dayjs.Dayjs
    addFromDate: (diff: number) => void
    updateTask: (partTask: PartTask) => void
    openAddTaskModal: (task: Task) => void
    openEditTaskModal: (task: Task) => void
    setDebug: (dbg: string) => void
}

const Calendar: React.FC<Props> = (props) => {
    const { tasks, fromDate, addFromDate, updateTask, openAddTaskModal, openEditTaskModal, setDebug } = props

    const dragStart = (e: React.DragEvent<HTMLDivElement>, task: Task, task_start_no: number, task_row_span: number) => {
        const grasp_no = task_start_no + Math.floor(e.nativeEvent.offsetY / (e.currentTarget.clientHeight / task_row_span))
        e.dataTransfer.setData('text', JSON.stringify({ task, grasp_no }))
    }

    const drop = (e: React.DragEvent<HTMLDivElement>, cell_start_no: number, cell_start_date: dayjs.Dayjs, cell_row_span: number) => {
        const { task, grasp_no } = JSON.parse(e.dataTransfer.getData('text'))
        const release_no = cell_start_no + Math.floor(e.nativeEvent.offsetY / (e.currentTarget.clientHeight / cell_row_span))
        if (grasp_no === undefined) {
            const after_start_date = cell_start_date.add((release_no - cell_start_no) * 30, 'm')
            const after_end_date = after_start_date.add(30, 'm')
            updateTask({ id: task.id, start_date: after_start_date, end_date: after_end_date })
        } else {
            const add_minutes = (release_no - grasp_no) * 30
            const after_start_date = addDate(dayjs(task.start_date), add_minutes, DateType.Start)
            const after_end_date = addDate(dayjs(task.end_date), add_minutes, DateType.End)
            updateTask({ id: task.id, start_date: after_start_date, end_date: after_end_date })
        }
    }

    const hours = cm.createNumRange(9, 17)

    return (
        <div className={`grid grid-flow-col ${cm.getGridRows(hours.length * 2)}`}>
            <div
                className={`flex items-center justify-center ${cm.getRowSpan(hours.length * 2)} text-right bg-cyan-100 cursor-pointer`}
                onClick={() => addFromDate(-1)}
                onDragEnter={() => addFromDate(-1)}
            >
                ＜
            </div>
            {
                hours.map((hour) => <div key={hour} className="flex items-center justify-end row-span-2 text-right">{`${cm.padLeftZero(hour, 2)}:00`}</div>)
            }
            {
                cm.createNumRange(0, 6)
                    .map((diff) => {
                        const date = fromDate.add(diff, 'd')
                        const dateRanges = createDateRanges(date.format('YYYY-MM-DD'), hours)
                        return createCellElements(date.format(`YYYY.MM.DD(ddd)`), tasks, dateRanges, dateRanges.length * diff + 1, dragStart, drop, openAddTaskModal, openEditTaskModal, setDebug)
                    })
            }
            <div
                className={`flex items-center justify-center ${cm.getRowSpan(hours.length * 2)} text-right bg-cyan-100 cursor-pointer`}
                onClick={() => addFromDate(1)}
                onDragEnter={() => addFromDate(1)}
            >
                ＞
            </div>
        </div>
    )
}

const createCellElements = (
    ymd_caption: string,
    allTasks: Task[],
    dateRanges: DateRange[],
    lower_no: number,
    dragStart: (e: React.DragEvent<HTMLDivElement>, task: Task, task_start_no: number, task_row_span: number) => void,
    drop: (e: React.DragEvent<HTMLDivElement>, cell_start_no: number, cell_start_date: dayjs.Dayjs, cell_row_span: number) => void,
    openAddTaskModal: (task: Task) => void,
    openEditTaskModal: (task: Task) => void,
    setDebug: (dbg: string) => void,
) => {
    // const dbg: any[] = []
    // let dbg = null

    // [task1], [], [task2], [task2, task3], [task2, task4], [task4], [], ...
    const tasks1 = dateRanges.map((dateRange) => {
        return allTasks.filter((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to)) as FixedTask[]
    })

    // [[task1]], [[]], [[task2], [task2, task3], [task2, task4], [task4]], [[]], ...
    const tasks2: FixedTask[][][] = []
    let tasksBufs: FixedTask[][] = []
    for (let i = 0; i < tasks1.length; i++) {
        const tasks = tasks1[i]
        if (i === 0) {
            tasksBufs.push(tasks)
        } else if (tasksBufs.length > 0 && tasks.some((task) => tasksBufs[tasksBufs.length - 1].some((buf) => buf.id === task.id))) {
            tasksBufs.push(tasks)
        } else {
            tasks2.push(tasksBufs)
            tasksBufs = []
            tasksBufs.push(tasks)
        }
    }
    tasks2.push(tasksBufs)

    // [<div>]
    const lower_date = dateRanges[0].from
    const divs = tasks2.map((tasksList, idx) => {
        if (tasksList.length === 1 && (tasksList[0].length === 0 || tasksList[0].length === 1)) {
            const tasks = tasksList[0]
            if (tasks.length === 0) {
                const no = lower_no + tasks2.reduce((acc, ts, idx2) => idx2 < idx ? acc + ts.length : acc, 0)
                const start_date = lower_date.add((no - lower_no) * 30, 'm')
                return (
                    <div key={no} className="border border-gray-400 flex items-center justify-center focus:border-blue-500"
                        onDoubleClick={() => openAddTaskModal({ id: 0, name: '', start_date, end_date: start_date.add(30, 'm') })}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => drop(e, no, start_date, 1)}
                        tabIndex={0}
                    ></div>
                )
            } else {
                const task = tasks[0]
                const task_start_no = lower_no + task.start_date.diff(lower_date, 'm') / 30
                return (
                    <div
                        key={task_start_no}
                        className="border border-gray-400 flex items-center justify-center bg-teal-500 cursor-pointer focus:border-blue-500"
                        draggable={true}
                        onDoubleClick={() => openEditTaskModal(task)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={(e) => dragStart(e, task, task_start_no, 1)}
                        onDrop={(e) => drop(e, task_start_no, task.start_date, 1)}
                        tabIndex={0}
                    >
                        {task.name}
                    </div>
                )
            }
        } else {
            const tasks = Array.from((new Map(tasksList.flat().map((b) => [b.id, b]))).values())
            const sg_col_span = tasksList.reduce((acc, ts) => ts.length > acc ? ts.length : acc, 0)
            const sg_row_span = tasksList.length
            const sg_upper_date = tasksList[tasksList.length - 1][0].end_date
            const sg_lower_no = lower_no + tasksList[0][0].start_date.diff(lower_date, 'm') / 30
            const sg_upper_no = lower_no + sg_upper_date.diff(lower_date, 'm') / 30 - 1
            const width = cm.getWidth(1 / sg_col_span)
            const filledNos = [...Array(sg_col_span)].map((_) => new Set<number>([]))
            const filledDivs = tasks.map((task) => {
                const task_start_no = lower_no + task.start_date.diff(lower_date, 'm') / 30
                const task_end_no = lower_no + task.end_date.diff(lower_date, 'm') / 30 - 1
                const task_nos = new Set<number>([])
                for (const no of cm.createNumRange(task_start_no, task_end_no)) {
                    task_nos.add(no)
                }
                let x = null
                for (let col_no = 0; col_no < filledNos.length; col_no++) {
                    if (!Array.from(task_nos).some((no) => filledNos[col_no].has(no))) {
                        for (const no of task_nos) {
                            filledNos[col_no].add(no)
                        }
                        x = cm.getX(col_no / sg_col_span)
                        break
                    }
                }
                const y = cm.getY((task_start_no - sg_lower_no) / (sg_upper_no - sg_lower_no + 1))
                const task_row_span = tasksList.flat().reduce((acc, t) => t.id === task.id ? acc + 1 : acc, 0)
                const height = cm.getHeight(task_row_span / sg_row_span)
                return (
                    <div
                        key={`${task_start_no}-${x}`}
                        className={`absolute border border-gray-400 flex items-center justify-center ${x} ${y} ${width} ${height} bg-teal-500 cursor-pointer focus:border-blue-500`}
                        draggable={true}
                        onDoubleClick={() => openEditTaskModal(task)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={(e) => dragStart(e, task, task_start_no, task_row_span)}
                        onDrop={(e) => drop(e, task_start_no, task.start_date, task_row_span)}
                        tabIndex={0}
                    >
                        {task.name}
                    </div>
                )
            })
            const emptyDivs = []
            for (let col_no = 0; col_no < filledNos.length; col_no++) {
                for (const no of cm.createNumRange(sg_lower_no, sg_upper_no)) {
                    if (!filledNos[col_no].has(no)) {
                        const x = cm.getX(col_no / sg_col_span)
                        const y = cm.getY((no - sg_lower_no) / (sg_upper_no - sg_lower_no + 1))
                        const height = cm.getHeight(1 / sg_row_span)
                        const start_date = lower_date.add((no - lower_no) * 30, 'm')
                        emptyDivs.push(
                            <div
                                key={`${no}-${x}`}
                                className={`absolute border border-gray-400 flex items-center justify-center ${x} ${y} ${width} ${height} focus:border-blue-500`}
                                onDoubleClick={() => openAddTaskModal({ id: 0, name: '', start_date, end_date: start_date.add(30, 'm') })}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => drop(e, no, start_date, 1)}
                                tabIndex={0}
                            >
                            </div>
                        )
                    }
                }
            }
            return (
                <div key={sg_lower_no} className={`relative ${cm.getRowSpan(sg_row_span)}`}>
                    {filledDivs}
                    {emptyDivs}
                </div>
            )
        }
    })

    // lower_date -> sg_lower_date -> task.start_date -> task.end_date -> sg_upper_date -> upper_date
    // lower_no   -> sg_lower_no   -> task_start_no   -> task_end_no   -> sg_upper_no   -> upper_no
    // filledDiv <-> emptyDiv
    // sg_col_span <-> sg_row_span
    // (task_col_span) <-> task_row_span
    // filledNos
    // col_no <-> (row_no)
    // sg: subgrid

    // if (setDebug) setDebug(JSON.stringify(dbg))

    return (
        <React.Fragment key={lower_no}>
            <div className="border border-gray-400 text-center">{ymd_caption}</div>
            {divs}
        </React.Fragment>
    )
}

const createDateRanges = (ymd: string, hours: number[]): DateRange[] => {
    return hours.flatMap((hour) => [
        { from: dayjs(`${ymd} ${cm.padLeftZero(hour, 2)}:00:00`), to: dayjs(`${ymd} ${cm.padLeftZero(hour, 2)}:30:00`) },
        { from: dayjs(`${ymd} ${cm.padLeftZero(hour, 2)}:30:00`), to: dayjs(`${ymd} ${cm.padLeftZero(hour + 1, 2)}:00:00`) },
    ]).slice(0, hours.length * 2 - 1)
}

const addDate = (date: dayjs.Dayjs, minutes: number, date_type: DateType) => {
    let ret = date
    let cur_minutes = minutes
    const [lower_limit, upper_limit] = date_type === DateType.Start ? ['09:00:00', '17:00:00'] : ['09:30:00', '17:30:00']

    if (cur_minutes > 0) {
        while (cur_minutes > 0) {
            ret = ret.add(30, 'm')
            if (ret.isAfter(`${ret.format('YYYY-MM-DD')} ${upper_limit}`)) {
                ret = dayjs(`${ret.add(1, 'd').format('YYYY-MM-DD')} ${lower_limit}`)
            }
            cur_minutes -= 30
        }
    } else if (cur_minutes < 0) {
        while (cur_minutes < 0) {
            ret = ret.subtract(30, 'm')
            if (ret.isBefore(`${ret.format('YYYY-MM-DD')} ${lower_limit}`)) {
                ret = dayjs(`${ret.subtract(1, 'd').format('YYYY-MM-DD')} ${upper_limit}`)
            }
            cur_minutes += 30
        }
    }

    return ret
}

export default Calendar
