import { useEffect, useState } from 'react'

/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 18:36:39
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 19:32:07
 * @FilePath: /next-doc/src/components/CountDown/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from './index.module.scss'

interface IProps {
  time: number;
  onEnd: Function;
}

const CountDown = (props: IProps) => {
  const { time, onEnd } = props

  return <div className={styles.countDown}>{time}</div>
}

export default CountDown
