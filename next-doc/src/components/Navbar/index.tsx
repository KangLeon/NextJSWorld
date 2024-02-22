/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-28 16:52:45
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 18:35:09
 * @FilePath: /next-doc/src/components/Navbar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { NextPage } from 'next'
import { observer } from 'mobx-react-lite'
import { navs } from './config'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import styles from './index.module.scss'
import { usePathname } from 'next/navigation'
import { Button, Avatar, Dropdown, MenuProps, message } from 'antd'
import { LoginOutlined, HomeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useStore } from '../../../store'
import Login from '../Login'
import request from '../../service/fetch'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const store = useStore()
  const { id, avatar } = store.user.userInfo
  const pathname = usePathname()
  const { push } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleGotoEditorPage = () => {
    if (id) {
      push('/editor')
    } else {
      message.warning('请先登录')
    }
  }

  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  const handleGotoPersonalPage = () => {
    push(`/user/${id}`)
  }

  const handleLogOut = () => {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        store.user.setUserInfo({})
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      label: '个人主页',
      key: 'home',
      icon: <HomeOutlined onClick={handleGotoPersonalPage}></HomeOutlined>,
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: <LoginOutlined onClick={handleLogOut}></LoginOutlined>,
    },
  ]

  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>AI 导航</section>
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
        <Button onClick={handleGotoEditorPage}>发布文章</Button>
        {id ? (
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

export default observer(Navbar)
