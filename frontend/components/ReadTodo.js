import React, { useContext, useEffect, useState } from "react"
import { LoadingContext, RefreshTodosContext } from "../pages"
import UpdateTodo from "./UpdateTodo"
import DeleteTodo from "./DeleteTodo"

export default function ReadTodo({ data }) {
  const { setLoading } = useContext(LoadingContext)
  const { refreshTodos, setRefreshTodos } = useContext(RefreshTodosContext)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setTodos(data)
  }, [])

  useEffect(async () => {
    if (refreshTodos) {
      try {
        const response = await fetch(
          "https://mern-todo-with-next.herokuapp.com/todos"
        )
        const fetchedData = await response.json()
        setTodos(fetchedData)
        setLoading(false)
        setRefreshTodos(false)
      } catch (error) {
        console.error(error)
      }
    }
  }, [refreshTodos])

  const todosDone = todos.filter((todo) => {
    return todo.done === true
  })

  const isDone = async (id, done) => {
    try {
      setLoading(true)
      await fetch(`https://mern-todo-with-next.herokuapp.com/${id}`, {
        method: "PUT",
        body: JSON.stringify({ done: !done }),
        headers: { "Content-Type": "application/json" }
      })
      setRefreshTodos(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-rose-200 dark:bg-gray-800 dark:text-gray-400 transition duration-500">
      <div className="md:w-8/12 xl:w-6/12 2xl:w-5/12 mx-auto px-5 md:text-2xl">
        <div className="grid grid-cols-6 justify-items-start gap-y-5 ">
          <div className="col-start-1 col-end-5">To Do</div>
          <div className="col-start-5 col-end-6 justify-self-center">Edit</div>
          <div className="col-start-6 col-end-7 justify-self-center">
            Delete
          </div>

          {todos.length === 0 && (
            <h3 className="col-start-1 col-end-7 justify-self-center">
              no todos yet
            </h3>
          )}
          {todos.map((todo) => {
            return (
              <React.Fragment key={todo._id}>
                <button
                  onClick={() => isDone(todo._id, todo.done)}
                  className={`${
                    todo.done ? "line-through" : ""
                  } hover:line-through col-start-1 col-end-5 break-all`}
                >
                  •{todo.item}
                </button>
                <UpdateTodo todo={todo} />
                <DeleteTodo todoId={todo._id} />
              </React.Fragment>
            )
          })}
        </div>
        {todos.length > 0 && (
          <h1 className="w-11/12 text-xl md:text-2xl text-center p-5">
            Completed {todosDone.length} out of {todos.length}{" "}
            {todos.length === 1 ? "todo" : "todos"}.{" "}
            {todosDone.length === todos.length &&
              todos.length > 0 &&
              "Good job!"}
          </h1>
        )}
      </div>
    </div>
  )
}
