'use client'
/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-27 22:22:32
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-25 00:16:33
 * @FilePath: /next-doc/src/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import ListItem, { IArticle } from '@/components/ListItem'
import { Divider, message } from 'antd'
import request from '../service/fetch'
import { useEffect, useState } from 'react'

const Page = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    requestGetArticle()
  }, [])

  const requestGetArticle = () => {
    request.post('/api/article/list', {}).then((res: any) => {
      if (res?.code === 0) {
        setArticles(res?.data)
      } else {
        message.error(res?.msg || '文章获取失败')
      }
    })
  }

  return (
    <div className="mt-10 ">
      {articles?.map((article: IArticle) => (
        <div key={`key_${article.article_id}`}>
          <ListItem article={article}></ListItem>
          <Divider></Divider>
        </div>
      ))}
    </div>
  )
}

export default Page
