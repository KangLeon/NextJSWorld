/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-28 16:52:45
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-01-28 18:17:06
 * @FilePath: /next-doc/src/components/Navbar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextPage } from 'next'
import { navs } from './config'
import Link from 'next/link'
import styles from './index.module.scss'

const Navbar: NextPage = () => {
  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => {
          return (
            <Link key={nav?.label} href={nav?.value} legacyBehavior>
              <a>{nav?.label}</a>
            </Link>
          )
        })}
      </section>
    </div>
  )
}

export default Navbar
