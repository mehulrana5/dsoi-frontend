import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router";
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"
import MembersPage from './pages/MembersPage.tsx'
import UserContextProvider from './context/UserContextProvider.tsx';
import Page from './app/dashboard/page.tsx';
import LoginForm from './app/login/page.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <HashRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route element={<Page />}>
            <Route path='/member' element={<MembersPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </HashRouter>
  </ThemeProvider>
)
