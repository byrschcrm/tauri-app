import "./App.css";
import { FC } from 'react';
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DateType = {
    Start: 1,
    End: 2,
} as const
type DateType = typeof DateType[keyof typeof DateType]

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

    const funcB = (e: any, no: any, span: any) => {
        const { task, start_no } = JSON.parse(e.dataTransfer.getData('text'))
        const end_no = no + Math.floor(e.nativeEvent.offsetY / (e.currentTarget.clientHeight / span))
        const add_minutes = (end_no - start_no) * 30
        const after_start_date = addDate(dayjs(task.start_date), add_minutes, DateType.Start)
        const after_end_date = addDate(dayjs(task.end_date), add_minutes, DateType.End)
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

            {/* <div className="border border-gray-400 col-span-2 text-center">2024.07.25(木)</div>
            {createCellElements(tasks, createDateRanges('2024-07-25'), 9 * 5 + 1, funcA, funcB)}
            {createCellElements(tasks, createDateRanges('2024-07-25'), 9 * 5 + 1, funcA, funcB)} */}

            {/* <div className="border border-gray-400 col-span-2 text-center">2024.07.25(木)</div>
            {createCellElements2(tasks, createDateRanges('2024-07-25'), 9 * 4 + 1, funcA, funcB)} */}

            {createCellElementsX3(tasks, createDateRanges('2024-07-25'), 9 * 4 + 1, funcA, funcB, setDebug)}

            <div className="border border-gray-400 text-center">2024.07.26(金)</div>
            {createCellElements(tasks, createDateRanges('2024-07-26'), 9 * 5 + 1, funcA, funcB)}

            <div className="border border-gray-400 text-center">2024.07.27(土)</div>
            {createCellElements(tasks, createDateRanges('2024-07-27'), 9 * 6 + 1, funcA, funcB)}
        </div>
    )
}

const createCellElementsX1 = () => {
    return (
        <>
            <div className="border border-gray-400 col-span-2 text-center">2024.07.25(木)</div>
            <div className="border border-gray-400 col-span-2 row-span-1"></div>
            <div className="border border-gray-400 col-span-2 row-span-1"></div>
            <div className="border border-gray-400 col-span-1 row-span-3"></div>
            <div className="border border-gray-400 col-span-1 row-span-1"></div>
            <div className="border border-gray-400 col-span-2 row-span-1"></div>
            <div className="border border-gray-400 col-span-2 row-span-1"></div>
            <div className="border border-gray-400 col-span-2 row-span-1"></div>
            <div className="border border-gray-400 col-span-1 row-span-1"></div>
            <div className="border border-gray-400 col-span-1 row-span-1"></div>
            <div className="border border-gray-400 col-span-1 row-span-2"></div>
        </>
    )
}

const createCellElementsX2 = () => {
    return (
        <>
            <div className="border border-gray-400 text-center">2024.07.25(木)</div>
            <div className="border border-gray-400"></div>
            <div className="border border-gray-400"></div>
            {/* <div className="flex flex-col flex-wrap row-span-4">
                <div className="border border-gray-400 w-1/2 h-3/4">task2</div>
                <div className="border border-gray-400 w-1/2 h-1/4"></div>
                <div className="border border-gray-400 w-1/2 h-1/4"></div>
                <div className="border border-gray-400 w-1/2 h-1/4">task3</div>
                <div className="border border-gray-400 w-1/2 h-2/4">task4</div>
            </div> */}
            {/* <div className="grid grid-cols-2 grid-rows-4 grid-flow-col h-full row-span-4">
                <div className="border border-gray-400 row-span-3">task2</div>
                <div className="border border-gray-400 row-span-1"></div>
                <div className="border border-gray-400 row-span-1"></div>
                <div className="border border-gray-400 row-span-1">task3</div>
                <div className="border border-gray-400 row-span-2">task4</div>
            </div> */}
            <div className="relative row-span-4">
                <div className="absolute border border-gray-400 w-1/2 h-3/4 inset-x-0 inset-y-0">task2</div>
                <div className="absolute border border-gray-400 w-1/2 h-1/4 inset-x-0 inset-y-3/4"></div>
                <div className="absolute border border-gray-400 w-1/2 h-1/4 inset-x-1/2 inset-y-0"></div>
                <div className="absolute border border-gray-400 w-1/2 h-1/4 inset-x-1/2 inset-y-1/4">task3</div>
                <div className="absolute border border-gray-400 w-1/2 h-2/4 inset-x-1/2 inset-y-2/4">task4</div>
            </div>
            <div className="border border-gray-400"></div>
            <div className="border border-gray-400"></div>
            <div className="border border-gray-400"></div>
        </>
    )
}

const createCellElementsX3 = (tasks: any[], dateRanges: any, start_no: number, funcA: any, funcB: any, setDebug: any) => {
    // [task1], [], [task2], [task2, task3], [task2, task4], [task4], [], ...
    const aaa = dateRanges.map((dateRange: any) => {
        return tasks.filter((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to))
    })

    // setDebug(JSON.stringify(aaa))

    // [[task1]], [[]], [[task2], [task2, task3], [task2, task4], [task4]], [[]], ...
    const bbbb = []
    let bufs: any[] = []
    for (let i = 0; i < aaa.length; i++) {
        const aa = aaa[i]
        if (i === 0) {
            bufs.push(aa)
        } else if (bufs.length > 0 && aa.some((a: any) => bufs[bufs.length - 1].some((buf: any) => buf.id === a.id))) {
            bufs.push(aa)
        } else {
            bbbb.push(bufs)
            bufs = []
            bufs.push(aa)
        }
    }
    bbbb.push(bufs)

    // setDebug(JSON.stringify(bbbb))

    let dbg: any[] = []

    const ccc = bbbb.map((bbb) => {
        if (bbb.length === 1) {
            const bb = bbb[0]
            if (bb.length === 0) {
                return (
                    <div className="border border-gray-400 flex items-center justify-center"
                        draggable={true}
                        onDragOver={(e) => e.preventDefault()}
                    // onDragStart={(e) => funcA(e, bb[0], cur_no, 1)}
                    // onDrop={(e) => funcB(e, cur_no, 1)}
                    >
                    </div>
                )
            } else {
                const lower_date = bbb[0][0].start_date
                const cur_no = start_no + bb[0].start_date.diff(lower_date, 'm') / 30
                return (
                    <div
                        className="border border-gray-400 flex items-center justify-center bg-teal-500 cursor-pointer"
                        draggable={true}
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={(e) => funcA(e, bb[0], cur_no, 1)}
                        onDrop={(e) => funcB(e, cur_no, 1)}
                    >
                        {bb[0].name}
                    </div>
                )
            }
        } else {
            const cols = bbb.reduce((acc, bb) => bb.length > acc ? bb.length : acc, 0)
            const width = getWidth(1 / cols)
            const row_span = bbb.length
            const tasks = Array.from((new Map(bbb.flat().map((b) => [b.id, b]))).values())
            const hhh = [...Array(cols)].map((_) => new Set<number>([]))
            const lower_date = bbb[0][0].start_date
            const upper_date = bbb[bbb.length - 1][0].end_date
            const end_no = start_no + upper_date.diff(lower_date, 'm') / 30
            const xxx = tasks.map((task) => {
                const cur_no = start_no + task.start_date.diff(lower_date, 'm') / 30
                const cur_no2 = start_no + task.end_date.diff(lower_date, 'm') / 30 - 1
                const nos = new Set<number>([])
                for (let i = cur_no; i <= cur_no2; i++) {
                    nos.add(i)
                }
                dbg.push({ start_no, end_no, cur_no, cur_no2 })
                let x = null
                for (let i = 0; i < hhh.length; i++) {
                    if (!Array.from(nos).some((no) => hhh[i].has(no))) {
                        for (const no of nos) {
                            hhh[i].add(no)
                        }
                        x = getX(i / cols)
                        break
                    }
                }
                const y = getY((cur_no - start_no) / (end_no - start_no))
                const rows = bbb.flat().reduce((acc, b) => b.id === task.id ? acc + 1 : acc, 0)
                const height = getHeight(rows / row_span)
                return (
                    <div
                        className={`absolute border border-gray-400 flex items-center justify-center ${x} ${y} ${width} ${height} bg-teal-500 cursor-pointer`}
                        draggable={task !== null}
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={(e) => funcA(e, task, cur_no, rows)}
                        onDrop={(e) => funcB(e, cur_no, rows)}
                    >
                        {task.name}
                    </div>
                )
            })
            const emptyDivs = []
            for (let i = 0; i < hhh.length; i++) {
                for (let j = start_no; j <= end_no - 1; j++) {
                    if (!hhh[i].has(j)) {
                        const x = getX(i / cols)
                        const y = getY((j - start_no) / (end_no - start_no))
                        const height = getHeight(1 / row_span)
                        emptyDivs.push(<div className={`absolute border border-gray-400 flex items-center justify-center ${x} ${y} ${width} ${height}`}></div>)
                    }
                }
            }
            return (
                <div className={`relative ${getRowSpan(row_span)}`}>
                    {xxx}
                    {emptyDivs}
                </div>
            )
        }
    })

    setDebug(JSON.stringify(dbg))

    return (
        <>
            <div className="border border-gray-400 text-center">2024.07.25(木)</div>
            {ccc}
        </>
    )
}

const calcNo = (start_no: number, upper_date: Dayjs, start_date: Dayjs) => {
    return start_no + upper_date.diff(start_date, 'm') / 30
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
            onDrop={(e) => funcB(e, c.no, c.span)}
        >
            {c.task?.name}
        </div>
    )
}

const createCellElements2 = (tasks: any[], dateRanges: any, start_no: number, funcA: any, funcB: any) => {
    // [task1], [], [task2], [task2, task3], [task2, task4], [task4], [], ...
    const aaa = dateRanges.map((dateRange: any) => {
        return tasks.filter((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to))
    })

    // { [task1], span: 1 }, { [], span: 1 }, { [], span: 1 }, { [task2, task3], span: 2 }, { [], span: 1 }, ...

    // grid-cols-2
    // col-span-2, row-span-1 /
    // col-span-2, row-span-1 /
    // col-span-1, row-span-3 / col-span-1, row-span-1
    //                        / col-span-1, row-span-1
    //                        / col-span-1, row-span-2
    // col-span-1, row-span-1 /
    // col-span-2, row-span-1 /
    // ...

    return (
        // <div className="grid grid-cols-2">
        <>
            <div className="col-span-2 row-span-1"></div>
            <div className="col-span-2 row-span-1"></div>
            <div className="col-span-1 row-span-3"></div>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-2 row-span-1"></div>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-1"></div>
        </>
        // </div>
    )
}

const createCellElements3 = (tasks: any[], dateRanges: any, start_no: number, funcA: any, funcB: any) => {
    // [task1], [], [task2], [task2, task3], [task2, task4], [task4], [], ...
    const aaa = dateRanges.map((dateRange: any) => {
        return tasks.filter((task) => task.start_date?.isSameOrBefore(dateRange.from) && task.end_date?.isSameOrAfter(dateRange.to))
    })

    // { [task1], span: 1 }, { [], span: 1 }, { [], span: 1 }, { [task2, task3], span: 2 }, { [], span: 1 }, ...

    // grid-cols-2
    // col-span-2, row-span-1 /
    // col-span-2, row-span-1 /
    // col-span-1, row-span-3 / col-span-1, row-span-1
    //                        / col-span-1, row-span-1
    //                        / col-span-1, row-span-2
    // col-span-1, row-span-1 /
    // col-span-2, row-span-1 /
    // ...

    return (
        // <div className="grid grid-cols-2">
        <>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-2"></div>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-1"></div>
        </>
        // </div>
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

const getGridCols = (num: any) => {
    switch (num) {
        case 1:
            return 'grid-cols-1'
        case 2:
            return 'grid-cols-2'
        case 3:
            return 'grid-cols-3'
        case 4:
            return 'grid-cols-4'
        case 5:
            return 'grid-cols-5'
        case 6:
            return 'grid-cols-6'
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
    const [lower_limit, upper_limit] = date_type === DateType.Start ? ['09:00:00', '13:00:00'] : ['09:30:00', '13:30:00']

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
