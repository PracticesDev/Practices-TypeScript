import { useEffect, useRef, useState } from 'react'
import { type Todo as TodoType } from "../types"

interface Props extends TodoType {
    id: string
    title: string
    completed: boolean
    removeTodo: (id: string) => void
    setCompleted: (id: string, completed: boolean) => void
    setTitle: (params: { id: string, title: string }) => void
    isEditing: string
    setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({
    id,
    title,
    completed,
    removeTodo,
    setCompleted,
    setTitle

}) => {

    const [editedTitle, setEditedTitle] = useState(title)
    const [isEditing, setIsEditing] = useState('')
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== title) {
                setTitle({ id, title: editedTitle })
            }

            if (editedTitle === '') removeTodo(id)
            setIsEditing('')
        }

        if (e.key === 'Escape') {
            setEditedTitle(title)
            setIsEditing('')
        }
    }

    useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])



    return (
        <>
            <div className='view'>
                <input
                    className='toggle'
                    checked={completed}
                    type='checkbox'
                    onChange={(e) => { setCompleted(id, e.target.checked) }}
                />
                <label>{title}</label>
                <button className='destroy' onClick={() => { removeTodo(id) }}></button>
            </div>
            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}