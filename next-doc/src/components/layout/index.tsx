import { NextPage } from 'next'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useStore } from '../../../store'

type LayoutProps = {
  children: React.ReactNode,
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  const store = useStore()
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
