import { ThemeProvider } from './components/ui/theme-provider'
import { ModeToggle } from './components/ui/mode-toggle'
import { Routes, Route } from 'react-router'
import Search from './components/Search'
import Detail from './components/Detail'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="spotify-ui-theme">
      <header className="flex justify-center items-center max-w-screen pt-2 gap-12">
        <h1 className="text-3xl font-bold text-center ">
          Spotify Search App
        </h1>
        <ModeToggle />
      </header>
      <div className="flex flex-col justify-start items-center min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/detail/:type/:id" element={<Detail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
