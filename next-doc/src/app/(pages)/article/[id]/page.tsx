import { IArticle } from '@/components/ListItem'
import { initDB } from '@/db'
import { AppDataSource } from '@/db/data-source'
import { Article } from '@/db/entity/article'
import { Avatar } from 'antd'
import Link from 'next/link'
import { cookies } from 'next/headers'
import MarkDown from 'markdown-to-jsx'

export async function getData(articleId: number) {
  const status = await initDB()
  if (!status) {
    return
  }

  const article = await AppDataSource.getRepository(Article).findOne({
    where: {
      article_id: articleId,
    },
    relations: ['user'],
  })

  if (article) {
    article.views = article?.views + 1
    await AppDataSource.getRepository(Article).save(article)
  }

  return {
    props: article,
  }
}

export default async function Page({
  params: { id },
}: {
  params: { id: number },
}) {
  const item = await getData(id)
  const article = item?.props
  const user = article?.user

  const cookieStore = cookies()
  const userId = cookieStore.get('id')?.value
  console.log('拿到了cookie中的内容' + JSON.stringify(userId))

  return (
    <div className="mx-40 px-5 min-h-96 bg-white">
      <h2 className="text-3xl font-bold mb-10 pt-10">{article?.title}</h2>
      <div className="flex flex-row justify-start items-center mb-8">
        <Avatar src={user?.avatar} size={50}></Avatar>
        <div className=" ml-3">
          <div className=" text-sm font-bold mb-2">{user?.nickname}</div>
          <div className="flex flex-row items-center">
            <div className=" text-xs text-gray-500 ">
              {article?.update_time.toTimeString()}
            </div>
            <div className="mx-2 text-xs">阅读 {article?.views}</div>
            {String(userId) === String(user?.id) && (
              <Link
                href={`/editor/${article?.article_id}`}
                className="text-blue-700 text-xs"
              >
                编辑
              </Link>
            )}
          </div>
        </div>
      </div>
      <MarkDown>{article?.content}</MarkDown>
    </div>
  )
}
