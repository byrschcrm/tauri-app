import { useCallback, useState } from 'react';

const useDataHistory = <T>(initData: T) => {
    const [dataHistory, setDataHistory] = useState<T[]>([initData])
    const [curIdx, setCurIdx] = useState(0)

    const curData = dataHistory[curIdx]

    const push = useCallback((data: T) => {
        setDataHistory((prevHistory) => prevHistory.slice(0, curIdx + 1).concat([data]))
        setCurIdx((prevIdx) => prevIdx + 1)
    }, [curIdx])

    const undo = useCallback(() => {
        setCurIdx((prevIdx) => prevIdx > 0 ? prevIdx - 1 : prevIdx)
    }, [])

    const redo = useCallback(() => {
        setCurIdx((prevIdx) => prevIdx < dataHistory.length - 1 ? prevIdx + 1 : prevIdx)
    }, [dataHistory])

    return [curData, { push, undo, redo }] as const
}

export default useDataHistory
