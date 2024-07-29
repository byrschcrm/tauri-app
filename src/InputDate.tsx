import "./App.css";
import { FC } from 'react';
import dayjs from "dayjs";
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

type Props = {
    date: dayjs.Dayjs | null
    ymdPatterns: string[]
    hmsPatterns: string[]
    onChange: (date: dayjs.Dayjs | null) => void
}

const InputDate: FC<Props> = (props) => {
    const { date, ymdPatterns, hmsPatterns, onChange } = props
    const isEmpty = date === null
    const emptyText = '-------------'

    return (
        <div className="flex gap-1">
            <select value={date ? date.format('YYYY-MM-DD') : emptyText} disabled={isEmpty} onChange={(e) => date && onChange(dayjs(`${e.target.value} ${date.format('HH:mm:ss')}`))}>
                {isEmpty ? <option>{emptyText}</option> : ymdPatterns.map((p) => <option key={p}>{p}</option>)}
            </select>
            <select value={date ? date.format('HH:mm:ss') : emptyText} disabled={isEmpty} onChange={(e) => date && onChange(dayjs(`${date.format('YYYY-MM-DD')} ${e.target.value}`))}>
                {isEmpty ? <option>{emptyText}</option> : hmsPatterns.map((p) => <option key={p}>{p}</option>)}
            </select>
            <div>
                <label><input type="checkbox" checked={isEmpty} onChange={(e) => onChange(e.target.checked ? null : dayjs(`${ymdPatterns[0]} ${hmsPatterns[0]}`))} />Empty</label>
            </div>
        </div>
    )
}

export default InputDate
