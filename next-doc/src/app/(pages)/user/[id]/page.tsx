/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 00:01:05
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 20:02:56
 * @FilePath: /next-doc/src/app/(pages)/user/[id]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 00:01:05
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 00:05:23
 * @FilePath: /next-doc/src/pages/user/[id].tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ListItem from '@/components/ListItem'
import { initDB } from '@/db'
import { AppDataSource } from '@/db/data-source'
import { Article } from '@/db/entity/article'
import { User } from '@/db/entity/user'
import {
  FireOutlined,
  FundViewOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Divider } from 'antd'
import { cookies } from 'next/headers'

export async function getData(userId: number) {
  const status = await initDB()
  if (!status) {
    return
  }

  //获取到所有tag
  const user = await AppDataSource.getRepository(User).findOne({
    where: { id: userId },
  })

  const articles = await AppDataSource.getRepository(Article).find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: ['user', 'tags'],
  })

  return {
    props: user,
    articles,
  }
}

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await getData(id)

  const cookieStore = cookies()
  const userId = cookieStore.get('id')?.value

  console.log('cooloe里获得的' + userId)

  return (
    <div className="flex flex-row py-10">
      <div className="flex flex-col w-full bg-white">
        <div className="flex flex-row items-center justify-between p-10 rounded ">
          <div className="flex flex-row items-center">
            <Avatar src={data?.props?.avatar} size={80}></Avatar>
            <div className="flex flex-col ml-10">
              <div className="text-2xl font-bold">{data?.props?.nickname}</div>
              <div className="mt-2 flex flex-row text-gray-400">
                <PhoneOutlined></PhoneOutlined>
                <div className="ml-2">{data?.props?.mobile}</div>
              </div>
              <div className="mt-2 flex flex-row text-gray-400">
                <FireOutlined></FireOutlined>
                <div className="ml-2">{data?.props?.job}</div>
              </div>
              <div className="mt-2 flex flex-row text-gray-400">
                <UserOutlined></UserOutlined>
                <div className="ml-2">{data?.props?.introduce}</div>
              </div>
            </div>
          </div>
          {Number(userId) === Number(id) && (
            <Button href={`/user/profile/${id}`}>编辑个人资料</Button>
          )}
        </div>
        <Divider></Divider>
        {data?.articles?.map((article) => (
          <>
            <ListItem key={article.article_id} article={article}></ListItem>
            <div className=" border-b mx-10"></div>
          </>
        ))}
      </div>
      <div className="flex flex-col flex-shrink-0 p-5 h-40 ml-4 bg-white rounded">
        <div className=" text-base font-semibold">个人成就</div>
        <div className="flex flex-row text-gray-500 mt-4">
          <FundViewOutlined />
          <div className="ml-4">共创作7篇文章</div>
        </div>
        <div className="flex flex-row text-gray-500 mt-2">
          <FundViewOutlined />
          <div className="ml-4">共维护4个工具</div>
        </div>
      </div>
    </div>
  )
}

export default Page
