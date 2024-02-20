/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 16:34:40
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 18:40:12
 * @FilePath: /next-doc/src/components/Login/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextPage } from 'next'
import styles from './index.module.scss'
import { ChangeEvent, useState } from 'react'
import CountDown from '../CountDown'

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const { isShow = false } = props
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })

  const handleClose = () => {}

  const handleGetVerifyCode = () => {
    setIsShowVerifyCode(true)
  }

  const handleLogin = () => {}

  const handleOAuthGithub = () => {}

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleCountDownEnd = () => {}

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
              <CountDown time={10} onEnd={handleCountDownEnd}></CountDown>
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

export default Login
