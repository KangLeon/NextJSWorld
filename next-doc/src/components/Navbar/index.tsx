/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-28 16:52:45
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 16:33:35
 * @FilePath: /next-doc/src/components/Navbar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { NextPage } from 'next'
import { navs } from './config'
import Link from 'next/link'
import styles from './index.module.scss'
import { usePathname } from 'next/navigation'
import { Button } from 'antd'
import { useState } from 'react'
import Login from '../Login'

const Navbar: NextPage = () => {
  const pathname = usePathname()
  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleGotoEditorPage = () => {}

  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => {
          return (
            <Link key={nav?.label} href={nav?.value} legacyBehavior>
              <a className={pathname === nav?.value ? styles.active : ''}>
                {nav?.label}
              </a>
            </Link>
          )
        })}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose}></Login>
    </div>
  )
}

export default Navbar
