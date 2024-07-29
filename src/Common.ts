import dayjs from "dayjs";

export type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>
}

export type Id = {
    id: number
}

export type Task = Id & TaskAttr

export type TaskAttr = {
    name: string
    start_date: dayjs.Dayjs | null
    end_date: dayjs.Dayjs | null
}

export type PartTask = Id & Partial<TaskAttr>

export type FixedTask = RequiredNotNull<Task>

export const createNumRange = (start: number, end: number) => [...Array(end - start + 1)].map((_, idx) => start + idx)

export const padLeftZero = (num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len);
}

export const getGridRows = (num: number) => {
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

export const getRowSpan = (num: number) => {
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

export const getWidth = (num: number) => {
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

export const getHeight = (num: number) => {
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

export const getX = (num: number) => {
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

export const getY = (num: number) => {
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
