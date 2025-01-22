import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import { LoginForm } from './components/login-form.tsx';
import MembersPage from './pages/MembersPage.jsx'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ModeToggle />
    <BrowserRouter>
      <StrictMode>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<MembersPage />} />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </ThemeProvider>
)
