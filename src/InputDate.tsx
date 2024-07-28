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

    return (
        <div className="flex gap-1">
            <select disabled={isEmpty} onChange={(e) => date && onChange(dayjs(`${e.target.value} ${date.format('HH:mm:ss')}`))}>
                {isEmpty ? <option>{'-------------'}</option> : ymdPatterns.map((p) => <option key={p} selected={p === date.format('YYYY-MM-DD')}>{p}</option>)}
            </select>
            <select disabled={isEmpty} onChange={(e) => date && onChange(dayjs(`${date.format('YYYY-MM-DD')} ${e.target.value}`))}>
                {isEmpty ? <option>{'-------------'}</option> : hmsPatterns.map((p) => <option key={p} selected={p === date?.format('HH:mm:ss')}>{p}</option>)}
            </select>
            <div>
                <label><input type="checkbox" checked={isEmpty} onChange={(e) => onChange(e.target.checked ? null : dayjs(`${ymdPatterns[0]} ${hmsPatterns[0]}`))} />Empty</label>
            </div>
        </div>
    )
}

export default InputDate
