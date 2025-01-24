import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router";
import './index.css'
import { LoginForm } from './components/login-form.tsx';
import { ModeToggle } from './components/mode-toggle.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import MembersPage from './pages/MembersPage.tsx'
import UserContextProvider from './context/UserContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <HashRouter>
      <UserContextProvider>
        <ModeToggle />
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/member' element={<MembersPage />} />
        </Routes>
      </UserContextProvider>
    </HashRouter>
  </ThemeProvider>
)
