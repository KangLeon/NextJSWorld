/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-28 16:52:45
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 22:07:05
 * @FilePath: /next-doc/src/components/Navbar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { NextPage } from 'next'
import { navs } from './config'
import Link from 'next/link'
import styles from './index.module.scss'
import { usePathname } from 'next/navigation'
import { Button, Avatar, Dropdown, Menu, MenuProps } from 'antd'
import { LoginOutlined, HomeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Login from '../Login'
import { useStore } from '../../../store'

const Navbar: NextPage = () => {
  const store = useStore()
  const { nickname, avatar } = store.user.userInfo
  const pathname = usePathname()
  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleGotoEditorPage = () => {}

  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  const items: MenuProps['items'] = [
    {
      label: '个人主页',
      key: 'home',
      icon: <HomeOutlined></HomeOutlined>,
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: <LoginOutlined></LoginOutlined>,
    },
  ]

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
        {nickname ? (
          <>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Avatar src={avatar} size={32}></Avatar>
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={handleClose}></Login>
    </div>
  )
}

export default Navbar
