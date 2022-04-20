import { useState, useContext, useRef, useEffect } from "react"
import { LoadingContext, RefreshTodosContext } from "../pages"
import { IoIosAddCircleOutline } from "react-icons/io"

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState("")
  const [errMessage, setErrMessage] = useState(false)
  const { loading, setLoading } = useContext(LoadingContext)
  const { setRefreshTodos } = useContext(RefreshTodosContext)
  const textInput = useRef()

  useEffect(() => {
    textInput.current.focus()
  }, [])

  const createTodo = async (e) => {
    e.preventDefault()
    if (newTodo !== "") {
      try {
        setLoading(true)
        setNewTodo("")
        await fetch("https://mern-todo-with-next.herokuapp.com/todos", {
          method: "POST",
          body: JSON.stringify({ newTodo: newTodo }),
          headers: { "Content-Type": "application/json" }
        })
        setRefreshTodos(true)
      } catch (error) {
        console.error(error)
      }
    } else {
      setErrMessage(true)
    }
  }

  return (
    <div className="py-5">
      <form onSubmit={createTodo}>
        <div className="flex justify-center items-center">
          <input
            ref={textInput}
            className="outline-0 bg-rose-100 dark:bg-gray-400 dark:text-gray-800 transition duration:500 p-2 ml-2 text-xl md:text-2xl rounded-xl"
            onChange={(e) => {
              if (!loading) {
                setNewTodo(e.target.value)
                setErrMessage(false)
              }
            }}
            value={newTodo}
          />
          <button
            disabled={newTodo.length > 50 ? true : false}
            className={`${
              newTodo.length > 50 ? "" : "hover:scale-110 hover:text-gray-600"
            } text-gray-400 dark:text-rose-200 transition text-5xl md:text-6xl  pl-2 duration-500`}
          >
            <IoIosAddCircleOutline />
          </button>
        </div>
      </form>
      <h1
        className={`${
          newTodo.length > 50 ? "text-red-500" : "text-gray-400"
        } text-center text-lg md:text-xl`}
      >
        {errMessage ? (
          <p className="text-red-500">Can&apos;t be empty</p>
        ) : newTodo.length === 49 ? (
          "1 letter left"
        ) : newTodo.length <= 50 ? (
          `${50 - newTodo.length} letters left`
        ) : newTodo.length === 51 ? (
          "1 letter too much"
        ) : (
          `${(50 - newTodo.length) * -1} letters too much`
        )}
      </h1>
    </div>
  )
}
