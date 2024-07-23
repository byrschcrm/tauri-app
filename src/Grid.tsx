import "./App.css";
import { FC } from 'react';

type Props = {
    cols: number
    isEditable: boolean
}

const Grid: FC<Props> = (props) => {
    const { cols, isEditable } = props

    return (
        <div className={`grid grid-cols-${cols}`}>
            {
                (new Array(28)).fill(undefined).map((_) =>
                    <div className="border border-gray-400 h-5" contentEditable={isEditable}>

                    </div>)
            }
        </div>
    )
}

export default Grid
