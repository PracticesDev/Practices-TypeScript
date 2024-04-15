import { type ListOfTodos } from '../types'
import { Todo } from './Todo'
import { useState } from 'react'

interface Props {
    todos: ListOfTodos
    removeTodo: (id: string) => void
    setCompleted: (id: string, completed: boolean) => void
    setTitle: (params: { id: string, title: string }) => void

}

export const Todos: React.FC<Props> = ({
    todos,
    removeTodo,
    setCompleted,
    setTitle,
}) => {
    const [isEditing, setIsEditing] = useState('')

    return (
        <ul className='todo-list'>
            {todos.map(todo => (
                <li
                    key={todo.id}
                    onDoubleClick={() => { setIsEditing(todo.id) }} // <------
                    className={`
         ${todo.completed ? 'completed' : ''}
         ${isEditing === todo.id ? 'editing' : ''} // <----------
       `}
                >
                    {todo.title}
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        //onRemoveTodo={onRemoveTodo}
                        setCompleted={setCompleted}
                        setTitle={setTitle}
                        removeTodo={removeTodo}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                </li>
            ))}
        </ul>
    )
}