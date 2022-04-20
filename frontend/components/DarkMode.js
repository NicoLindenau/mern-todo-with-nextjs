import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs"
import { useTheme } from "next-themes"

export default function DarkMode() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex justify-end pr-5 w-full">
      <label
        className="cursor-pointer flex justify-between bg-rose-100 w-16 p-2 rounded-full relative dark:bg-gray-400 transition duration-500"
        htmlFor="chk"
      >
        <input
          type="checkbox"
          checked={theme === "dark" ? true : false}
          className="hidden peer"
          id="chk"
          readOnly
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />

        <div className="transition duration-500 peer-checked:translate-x-8 absolute w-5 h-5 bg-white top-1.5 left-1.5 rounded-full dark:bg-gray-700"></div>
        <BsFillSunFill className="text-gray-400 dark:text-rose-200 transition duration-500" />
        <BsMoonStarsFill className="text-gray-400 dark:text-rose-200 transition duration-500" />
      </label>
    </div>
  )
}
