import "./App.css";
import React from 'react';

type Props = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<Props> = (props) => {
    const { isOpen, onClose, children } = props

    return (
        <div
            className={`flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black/70 ${isOpen ? '' : 'hidden'}`}
            onClick={onClose}
        >
            {children}
        </div>
    )
}

export default Modal
