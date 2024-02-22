/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 16:34:40
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 17:10:44
 * @FilePath: /next-doc/src/components/Login/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { NextPage } from 'next'
import { observer } from 'mobx-react-lite'
import styles from './index.module.scss'
import { ChangeEvent, useState } from 'react'
import request from '../../service/fetch'
import CountDown from '../CountDown'
import { useStore } from '../../../store'
import { message } from 'antd'
import { setCookie } from 'cookies-next'

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const store = useStore()
  const { isShow = false, onClose } = props
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)

  const [count, setCount] = useState(10)
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })

  const handleClose = () => {
    onClose?.()
  }

  const handleLogin = () => {
    request
      .post('/api/user/login', { ...form })
      .then((res: any) => {
        if (res?.code === 0) {
          //登录成功
          onClose?.()
          message.success('登录成功')
          store.user.setUserInfo(res?.data)
          setCookie('id', res?.data.id)
          setCookie('nickname', res?.data.nickname)
          setCookie('avatar', res?.data.avatar)
        } else {
          message.error(res?.msg || '未知错误')
        }
      })
      .catch((err: any) => {
        console.log(JSON.stringify(err))
      })
  }

  const handleOAuthGithub = () => {}

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleGetVerifyCode = () => {
    if (!form?.phone) {
      message.warning('请输入手机号')
      return
    }

    //发起网路请求
    request.post('/api/articles/list', {}).then((res: any) => {
      if (res?.code === 0) {
        //设置为获取了验证码
        setIsShowVerifyCode(true)

        //启动定时器
        const id = setInterval(() => {
          setCount((count) => {
            if (count === 0) {
              clearInterval(id)
              handleCountDownEnd()
              return count
            } else {
              return count - 1
            }
          })
          return () => {
            console.log('清理了')
            clearInterval(id)
          }
        }, 1000)
      } else {
        message.error(res?.msg || '未知错误')
      }
    })
  }

  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false)
  }

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          name="phone"
          type="text"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        ></input>
        <div className={styles.verifyCodeArea}>
          <input
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          ></input>
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={count} onEnd={handleCountDownEnd} />
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          使用Github登录
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a href="h" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null
}

export default observer(Login)
