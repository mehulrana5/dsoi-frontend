import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import { LoginForm } from './components/login-form.tsx';
import { ModeToggle } from './components/mode-toggle.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import MembersPage from './pages/MembersPage.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ModeToggle />
    <BrowserRouter basename="/dsoi-frontend">
      <StrictMode>
        <Routes>
          <Route path='/dsoi-frontend' element={<LoginForm />} />
          <Route path='/member' element={<MembersPage />} />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </ThemeProvider>
)
