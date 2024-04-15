import { useState } from "react"
import { TODO_FILTERS } from "./consts"
import { type FilterValue } from "./types"

import { Todos } from "./Components/Todos"
import { Footer } from "./Components/Footer"
import { Header } from "./Components/Header"


const mockTodos = [
  { id: '1', title: 'Aprender React', completed: false },
  { id: '2', title: 'Aprender TypeScript', completed: true },
  { id: '3', title: 'Aprender Vite', completed: true },
]

const App = (): JSX.Element => {

  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    () => {

    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterValue | null
    if (filter === null) return TODO_FILTERS.ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : 
    TODO_FILTERS.ALL
  }  )


  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }


  const handleCompleted = (id: string, completed: boolean): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }


  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
  })


  const handleSave = (title: string): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }


  return (
    <>
      <div className="todoapp">
        <Header
          saveTodo={handleSave}
        />
        <Todos
          removeTodo={handleRemove}
          setCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          todos={filteredTodos}
        />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
          filterSelected={filterSelected}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </>
  )
}

export default App
