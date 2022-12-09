import { Route, Routes } from 'react-router-dom'

import { History, Home } from './pages'

export const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/history" element={<History />} />
  </Routes>
)
