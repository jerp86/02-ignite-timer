import { Outlet } from 'react-router-dom'
import { Header } from '../components'

export const DefaultLayout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
)
