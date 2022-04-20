import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My Todo List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider attribute="class">
        <div className="overflow-auto font-Oswald text-black transition duration-500">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}

export default MyApp
