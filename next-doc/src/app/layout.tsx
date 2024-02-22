/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-27 22:22:32
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 20:29:58
 * @FilePath: /next-doc/src/app/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { StoreProvider } from '../../store'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const pathname = usePathname()

  console.log("当前的路由" + pathname)

  const id = getCookie('id') as string
  const nickname = getCookie('nickname') as string
  const avatar = getCookie('avatar') as string

  console.log('当前的RootLayout')

  const renderComponent = () => { 
    if (pathname.includes('editor')) {
      return (children)
    } else { 
      return (<>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </>)
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider
          initialValue={{
            user: {
              userInfo: {
                id,
                nickname,
                avatar,
              },
            },
          }}
        >
          <main>
            {renderComponent()}
          </main>
        </StoreProvider>
      </body>
    </html>
  )
}
