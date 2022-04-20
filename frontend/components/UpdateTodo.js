import { useState, useContext } from "react"
import { LoadingContext, RefreshTodosContext } from "../pages"
import { GiCancel, GiConfirmed } from "react-icons/gi"
import { MdEdit } from "react-icons/md"

export default function UpdateTodo({ todo }) {
  const [updateInput, setUpdateInput] = useState("")
  const [modal, setModal] = useState(false)
  const [errMessage, setErrMessage] = useState(false)
  const { setLoading } = useContext(LoadingContext)
  const { setRefreshTodos } = useContext(RefreshTodosContext)

  const updateItem = async (e) => {
    e.preventDefault()
    if (updateInput !== "") {
      try {
        setLoading(true)
        setModal(false)
        await fetch(
          `https://mern-todo-with-next.herokuapp.com/todos/${todo._id}`,
          {
            method: "PUT",
            body: JSON.stringify({ updatedItem: updateInput }),
            headers: { "Content-Type": "application/json" }
          }
        )
        setUpdateInput("")
        setRefreshTodos(true)
      } catch (error) {
        console.error(error)
      }
    } else {
      setErrMessage(true)
    }
  }

  return (
    <>
      <button
        className="text-gray-400 dark:text-rose-200 hover:scale-150 duration-500 col-start-5 col-end-6 justify-self-center"
        onClick={() => {
          setModal(true)
        }}
      >
        <MdEdit />
      </button>
      {modal && (
        <>
          <div
            className="fixed left-0 top-0 h-screen w-screen bg-gray-400/30 dark:bg-black/40"
            onClick={() => {
              setModal(false)
              setUpdateInput("")
              setErrMessage(false)
            }}
          ></div>
          <div className="fixed left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 bg-rose-200 dark:bg-gray-700 rounded-xl">
            <div className="flex justify-between">
              <h1 className="m-5 text-2xl md:text-3xl">Edit Your Todo</h1>
              <button
                className="m-5 text-2xl md:text-3xl text-gray-400 hover:scale-150 hover:text-gray-600 duration-500 dark:text-rose-200"
                onClick={() => {
                  setModal(false)
                  setUpdateInput("")
                  setErrMessage(false)
                }}
              >
                <GiCancel />
              </button>
            </div>
            <form onSubmit={updateItem}>
              <div className="flex justify-between items-center">
                <input
                  autoFocus
                  className="ml-5 outline-0 bg-rose-100 p-2 text-md rounded-xl dark:bg-gray-400 dark:text-gray-800 dark:placeholder-gray-300 transition duration:500"
                  onChange={(e) => {
                    setUpdateInput(e.target.value)
                    setErrMessage(false)
                  }}
                  value={updateInput}
                  placeholder={todo.item}
                />
                <button
                  disabled={updateInput.length > 50 ? true : false}
                  className="m-5 text-2xl md:text-3xl text-gray-400 hover:scale-150 hover:text-gray-600 duration-500 dark:text-rose-200"
                >
                  <GiConfirmed />
                </button>
              </div>
            </form>
            <h1
              className={`${
                updateInput.length > 50 ? "text-red-500" : "text-gray-400"
              } text-center text-lg md:text-xl`}
            >
              {errMessage ? (
                <p className="text-red-500">Can&apos;t be empty</p>
              ) : updateInput.length === 49 ? (
                "1 letter left"
              ) : updateInput.length <= 50 ? (
                `${50 - updateInput.length} letters left`
              ) : updateInput.length === 51 ? (
                "1 letter too much"
              ) : (
                `${(50 - updateInput.length) * -1} letters too much`
              )}
            </h1>
          </div>
        </>
      )}
    </>
  )
}
