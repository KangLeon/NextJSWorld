/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-01-27 22:22:32
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 16:55:26
 * @FilePath: /next-doc/src/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initDB } from '@/db'
import { AppDataSource } from '@/db/data-source'
import { Article } from '@/db/entity/article'
import ListItem from '@/components/ListItem'
import { Divider } from 'antd'

export async function getData() {
  const status = await initDB()
  if (!status) {
    return
  }

  const articles = await AppDataSource.getRepository(Article).find({
    relations: ['user'],
  })

  return {
    props: articles,
  }
}

interface IArticle {}

interface IProps {
  articles: IArticle;
}

export default async function Home(props: IProps) {
  const data = await getData()

  return (
    <div className="mt-10 ">
      {data?.props?.map((article) => (
        <>
          <ListItem key={article.article_id} article={article}></ListItem>
          <Divider></Divider>
        </>
      ))}
    </div>
  )
}
