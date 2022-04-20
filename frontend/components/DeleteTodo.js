import { useContext } from "react"
import { AiFillDelete } from "react-icons/ai"
import { LoadingContext, RefreshTodosContext } from "../pages"

export default function DeleteTodo({ todoId }) {
  const { setLoading } = useContext(LoadingContext)
  const { setRefreshTodos } = useContext(RefreshTodosContext)

  const deleteTodo = async () => {
    try {
      setLoading(true)
      await fetch(`https://mern-todo-with-next.herokuapp.com/todos/${todoId}`, {
        method: "DELETE"
      })
      setRefreshTodos(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      className="dark:text-rose-200 transition text-gray-400 hover:text-red-400 hover:scale-150 duration-500 col-start-6 col-end-7 justify-self-center"
      onClick={deleteTodo}
    >
      <AiFillDelete />
    </button>
  )
}
