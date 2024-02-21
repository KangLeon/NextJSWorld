/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-27 22:22:32
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 15:59:46
 * @FilePath: /next-doc/src/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import Image from 'next/image'
import { mock } from 'mockjs'
import { StoreProvider } from '../../store'
import Layout from '@/components/layout'

export default function Home() {
  return (
    <StoreProvider initialValue={{ user: {} }}>
      <Layout>
        <div>我是首页</div>
      </Layout>
    </StoreProvider>
  )
}
