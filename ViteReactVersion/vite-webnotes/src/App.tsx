import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './myscss/main.scss'
import Notes from './components/Notes.tsx'

function App() {

  return (
    <>
      <div className="w-full">
        <a href="https://vitejs.dev" target="_blank" className="inline-block">
          <img src={viteLogo} className="logo w-56 bg-white" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="inline-block">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div id="initial-header" className="hover:bg-blue-400 font-medium border-b leading-8 w-1/2 max-h-6 px-1 hidden">Vite + React</div>

      <main>
      <article>
        <div className="App">
          <div className="text-3xl text-center text-slate-300 mt-4 pt-8  font-semibold">Web Notes!</div>
          <Notes />
          <header className="App-header min-h-12 font-sans" style={{alignContent: "center"}} >
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </article>
    </main>
    </>
  )
}

export default App
