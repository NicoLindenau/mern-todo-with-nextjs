import { createContext, useState } from "react"
import CreateTodo from "../components/CreateTodo"
import ReadTodo from "../components/ReadTodo"
import { ImSpinner2 } from "react-icons/im"
import DarkMode from "../components/DarkMode"

export const LoadingContext = createContext()
export const RefreshTodosContext = createContext()

export default function Home({ data }) {
  const [loading, setLoading] = useState(false)
  const [refreshTodos, setRefreshTodos] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <RefreshTodosContext.Provider value={{ refreshTodos, setRefreshTodos }}>
        {loading && (
          <div className="fixed z-10 h-screen w-screen bg-gray-400/30 dark:bg-black/40 flex justify-center items-center">
            <ImSpinner2 className="animate-spin dark:text-rose-200 text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl" />
          </div>
        )}
        <div className="bg-rose-200 dark:bg-gray-800 transition duration-500 h-screen pt-5">
          <DarkMode />
          <h1 className="text-center text-3xl md:text-4xl dark:text-gray-300 transition duration-500">
            My Todo List
          </h1>
          <CreateTodo />
          <ReadTodo data={data} />
        </div>
      </RefreshTodosContext.Provider>
    </LoadingContext.Provider>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    "https://mern-todo-with-next.herokuapp.com/todos"
  )
  const data = await response.json()
  return {
    props: { data: data },
    revalidate: 10
  }
}
