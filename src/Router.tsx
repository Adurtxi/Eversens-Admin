import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './common/layouts/Layout'
import { useLogin } from './hooks/use-login'
import LoginPage from './pages/auth/LoginPage'
import HomePage from './pages/home/HomePage'
import MedicinesPage from './pages/medicines/MedicinesPage'
import UsersPage from './pages/users/UsersPage'

export const AppRouter: React.FC<object> = () => {
  const { onLogin, loggedUser } = useLogin()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route
        path="/"
        element={loggedUser ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="*" element={<div>Nada que mostrar</div>} />
      </Route>
    </Routes>
  )
}
