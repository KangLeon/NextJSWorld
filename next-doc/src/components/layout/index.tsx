import { NextPage } from 'next';
import Navbar from '../Navbar';
import Footer from '../Footer';

type LayoutProps = {
  children: React.ReactNode,
};

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
