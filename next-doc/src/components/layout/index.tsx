/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-28 16:49:28
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 00:23:21
 * @FilePath: /next-doc/src/components/layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextPage } from 'next'
import Navbar from '../Navbar'
import Footer from '../Footer'

type LayoutProps = {
  children: React.ReactNode,
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
