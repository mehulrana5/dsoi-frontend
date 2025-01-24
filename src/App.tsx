import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import MembersPage from './pages/MembersPage.jsx'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MembersPage />
    </ThemeProvider>
  )
}

export default App
