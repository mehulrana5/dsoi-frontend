import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router";
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"
import UserContextProvider from './context/UserContextProvider.tsx';
import LoginForm from './app/login/page.tsx';
import Dashboard from './app/dashboard/page.tsx';
import MembersPage from './pages/MembersPage.tsx'
import RechargePage from './pages/RechargePage.tsx';
import TransactionsPage from './pages/TransactionsPage.tsx';
import BookDsoiPage from './pages/BookDsoiPage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx'
import AddGuestPage from './pages/AddGuestPage.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <HashRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route element={<Dashboard />}>
            <Route path='/member' element={<MembersPage />} />
            <Route path='/recharge' element={<RechargePage />} />
            <Route path='/transactions' element={<TransactionsPage />} />
            <Route path='/book' element={<BookDsoiPage />} />
            <Route path='/notifications' element={<NotificationsPage />} />
            <Route path='/addGuests' element={<AddGuestPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </HashRouter>
  </ThemeProvider>
)
