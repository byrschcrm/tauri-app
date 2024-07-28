import "./App.css";
import { FC } from 'react';
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

type Props = {
    tasks: any[]
    fromDate: dayjs.Dayjs
    addFromDate: any
    updateTask: any
    setDebug: any
}

const Calendar: FC<Props> = (props) => {
    const { tasks, fromDate, addFromDate, updateTask, setDebug } = props

    const dragStart = (e: any, task: any, task_start_no: any, task_row_span: any) => {
        const grasp_no = task_start_no + Math.floor(e.nativeEvent.offsetY / (e.currentTarget.clientHeight / task_row_span))
        e.dataTransfer.setData('text', JSON.stringify({ task, grasp_no }))
    }

    const drop = (e: any, cell_start_no: any, cell_start_date: any, cell_row_span: any) => {
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

    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

    return (
        <div className={`grid grid-flow-col ${getGridRows(hours.length * 2)}`}>
            <div
                className={`flex items-center justify-center ${getRowSpan(hours.length * 2)} text-right bg-cyan-100 cursor-pointer`}
                onClick={() => addFromDate(-1)}
            >
                ＜
            </div>
            {
                hours.map((hour) => <div className="flex items-center justify-end row-span-2 text-right">{`${padLeftZero(hour, 2)}:00`}</div>)
            }
            {
                [0, 1, 2, 3, 4, 5, 6]
                    .map((diff) => {
                        const date = fromDate.add(diff, 'd')
                        const dateRanges = createDateRanges(date.format('YYYY-MM-DD'), hours)
                        return createCellElementsX3(date.format(`YYYY.MM.DD(ddd)`), tasks, dateRanges, dateRanges.length * diff + 1, dragStart, drop, null)
                    })
            }
            <div
                className={`flex items-center justify-center ${getRowSpan(hours.length * 2)} text-right bg-cyan-100 cursor-pointer`}
                onClick={() => addFromDate(1)}
            >
                ＞
            </div>
        </div>
    )
}

const createCellElementsX3 = (ymd_caption: string, allTasks: any[], dateRanges: any, lower_no: number, dragStart: any, drop: any, setDebug: any) => {
    // const dbg: any[] = []
    // let dbg = null

    // [task1], [], [task2], [task2, task3], [task2, task4], [task4], [], ...
    const tasks1 = dateRanges.map((dateRange: any) => {
        return allTasks.filter((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to))
    })

    // [[task1]], [[]], [[task2], [task2, task3], [task2, task4], [task4]], [[]], ...
    const tasks2: any[] = []
    let tasksBufs: any[] = []
    for (let i = 0; i < tasks1.length; i++) {
        const tasks = tasks1[i]
        if (i === 0) {
            tasksBufs.push(tasks)
        } else if (tasksBufs.length > 0 && tasks.some((task: any) => tasksBufs[tasksBufs.length - 1].some((buf: any) => buf.id === task.id))) {
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
    const divs = tasks2.map((tasksList: any[], idx) => {
        if (tasksList.length === 1 && (tasksList[0].length === 0 || tasksList[0].length === 1)) {
            const tasks = tasksList[0]
            if (tasks.length === 0) {
                const no = lower_no + tasks2.reduce((acc, ts, idx2) => idx2 < idx ? acc + ts.length : acc, 0)
                const start_date = lower_date.add((no - lower_no) * 30, 'm')
                return (
                    <div className="border border-gray-400 flex items-center justify-center focus:border-blue-500"
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
                        className="border border-gray-400 flex items-center justify-center bg-teal-500 cursor-pointer focus:border-blue-500"
                        draggable={true}
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
            const width = getWidth(1 / sg_col_span)
            const filledNos = [...Array(sg_col_span)].map((_) => new Set<number>([]))
            const filledDivs = tasks.map((task) => {
                const task_start_no = lower_no + task.start_date.diff(lower_date, 'm') / 30
                const task_end_no = lower_no + task.end_date.diff(lower_date, 'm') / 30 - 1
                const task_nos = new Set<number>([])
                for (let no = task_start_no; no <= task_end_no; no++) {
                    task_nos.add(no)
                }
                let x = null
                for (let col_no = 0; col_no < filledNos.length; col_no++) {
                    if (!Array.from(task_nos).some((no) => filledNos[col_no].has(no))) {
                        for (const no of task_nos) {
                            filledNos[col_no].add(no)
                        }
                        x = getX(col_no / sg_col_span)
                        break
                    }
                }
                const y = getY((task_start_no - sg_lower_no) / (sg_upper_no - sg_lower_no + 1))
                const task_row_span = tasksList.flat().reduce((acc, t) => t.id === task.id ? acc + 1 : acc, 0)
                const height = getHeight(task_row_span / sg_row_span)
                return (
                    <div
                        className={`absolute border border-gray-400 flex items-center justify-center ${x} ${y} ${width} ${height} bg-teal-500 cursor-pointer focus:border-blue-500`}
                        draggable={true}
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
                for (let no = sg_lower_no; no <= sg_upper_no; no++) {
                    if (!filledNos[col_no].has(no)) {
                        const x = getX(col_no / sg_col_span)
                        const y = getY((no - sg_lower_no) / (sg_upper_no - sg_lower_no + 1))
                        const height = getHeight(1 / sg_row_span)
                        const start_date = lower_date.add((no - lower_no) * 30, 'm')
                        emptyDivs.push(
                            <div
                                className={`absolute border border-gray-400 flex items-center justify-center ${x} ${y} ${width} ${height} focus:border-blue-500`}
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
                <div className={`relative ${getRowSpan(sg_row_span)}`}>
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
        <>
            <div className="border border-gray-400 text-center">{ymd_caption}</div>
            {divs}
        </>
    )
}

const createDateRanges = (ymd: string, hours: number[]) => {
    return hours.flatMap((hour) => [
        { from: dayjs(`${ymd} ${padLeftZero(hour, 2)}:00:00`), to: dayjs(`${ymd} ${padLeftZero(hour, 2)}:30:00`) },
        { from: dayjs(`${ymd} ${padLeftZero(hour, 2)}:30:00`), to: dayjs(`${ymd} ${padLeftZero(hour + 1, 2)}:00:00`) },
    ]).slice(0, hours.length * 2 - 1)
}

const getGridRows = (num: any) => {
    switch (num) {
        case 1:
            return 'grid-rows-1'
        case 2:
            return 'grid-rows-2'
        case 3:
            return 'grid-rows-3'
        case 4:
            return 'grid-rows-4'
        case 5:
            return 'grid-rows-5'
        case 6:
            return 'grid-rows-6'
        case 7:
            return 'grid-rows-7'
        case 8:
            return 'grid-rows-8'
        case 9:
            return 'grid-rows-9'
        case 10:
            return 'grid-rows-10'
        case 11:
            return 'grid-rows-11'
        case 12:
            return 'grid-rows-12'
        case 13:
            return 'grid-rows-13'
        case 14:
            return 'grid-rows-14'
        case 15:
            return 'grid-rows-15'
        case 16:
            return 'grid-rows-16'
        case 17:
            return 'grid-rows-17'
        case 18:
            return 'grid-rows-18'
        case 19:
            return 'grid-rows-19'
        case 20:
            return 'grid-rows-20'
        default:
            return ''
    }
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
        case 7:
            return 'row-span-7'
        case 8:
            return 'row-span-8'
        case 9:
            return 'row-span-9'
        case 10:
            return 'row-span-10'
        case 11:
            return 'row-span-11'
        case 12:
            return 'row-span-12'
        case 13:
            return 'row-span-13'
        case 14:
            return 'row-span-14'
        case 15:
            return 'row-span-15'
        case 16:
            return 'row-span-16'
        case 17:
            return 'row-span-17'
        case 18:
            return 'row-span-18'
        case 19:
            return 'row-span-19'
        case 20:
            return 'row-span-20'
        default:
            return ''
    }
}

const getWidth = (num: number) => {
    switch (num) {
        case 1:
            return 'w-full'
        case 1 / 2:
            return 'w-1/2'
        case 1 / 3:
            return 'w-1/3'
        case 1 / 4:
            return 'w-1/4'
        case 1 / 5:
            return 'w-1/5'
        case 1 / 6:
            return 'w-1/6'
        default:
            return ''
    }
}

const getHeight = (num: number) => {
    switch (num) {
        case 1:
            return 'h-full'
        case 1 / 2:
            return 'h-1/2'
        case 1 / 3:
            return 'h-1/3'
        case 2 / 3:
            return 'h-2/3'
        case 1 / 4:
            return 'h-1/4'
        case 3 / 4:
            return 'h-3/4'
        case 1 / 5:
            return 'h-1/5'
        case 2 / 5:
            return 'h-2/5'
        case 3 / 5:
            return 'h-3/5'
        case 4 / 5:
            return 'h-4/5'
        case 1 / 6:
            return 'h-1/6'
        case 2 / 6:
            return 'h-2/6'
        case 4 / 6:
            return 'h-4/6'
        case 5 / 6:
            return 'h-5/6'
        default:
            return ''
    }
}

const getX = (num: number) => {
    switch (num) {
        case 0:
            return 'inset-x-0'
        case 1 / 2:
            return 'inset-x-1/2'
        case 1 / 3:
            return 'inset-x-1/3'
        case 2 / 3:
            return 'inset-x-2/3'
        case 1 / 4:
            return 'inset-x-1/4'
        case 3 / 4:
            return 'inset-x-3/4'
        case 1 / 5:
            return 'inset-x-1/5'
        case 2 / 5:
            return 'inset-x-2/5'
        case 3 / 5:
            return 'inset-x-3/5'
        case 4 / 5:
            return 'inset-x-4/5'
        case 1 / 6:
            return 'inset-x-1/6'
        case 2 / 6:
            return 'inset-x-2/6'
        case 4 / 6:
            return 'inset-x-4/6'
        case 5 / 6:
            return 'inset-x-5/6'
        default:
            return ''
    }
}

const getY = (num: number) => {
    switch (num) {
        case 0:
            return 'inset-y-0'
        case 1 / 2:
            return 'inset-y-1/2'
        case 1 / 3:
            return 'inset-y-1/3'
        case 2 / 3:
            return 'inset-y-2/3'
        case 1 / 4:
            return 'inset-y-1/4'
        case 3 / 4:
            return 'inset-y-3/4'
        case 1 / 5:
            return 'inset-y-1/5'
        case 2 / 5:
            return 'inset-y-2/5'
        case 3 / 5:
            return 'inset-y-3/5'
        case 4 / 5:
            return 'inset-y-4/5'
        case 1 / 6:
            return 'inset-y-1/6'
        case 2 / 6:
            return 'inset-y-2/6'
        case 4 / 6:
            return 'inset-y-4/6'
        case 5 / 6:
            return 'inset-y-5/6'
        default:
            return ''
    }
}

const addDate = (date: any, minutes: number, date_type: DateType) => {
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

const padLeftZero = (num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len);
}

export default Calendar
