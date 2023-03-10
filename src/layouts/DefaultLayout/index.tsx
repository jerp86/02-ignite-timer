import { Outlet } from 'react-router-dom'

import { Header } from '../../components'
import { LayoutContainer } from './styles'

export const DefaultLayout = () => (
  <LayoutContainer>
    <Header />
    <Outlet />
  </LayoutContainer>
)
