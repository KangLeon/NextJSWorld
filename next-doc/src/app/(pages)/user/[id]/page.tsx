'use client'

/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 00:01:05
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-25 00:08:55
 * @FilePath: /next-doc/src/app/(pages)/user/[id]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useEffect, useState } from 'react'
import { Avatar, Button, Divider, message } from 'antd'
import request from '../../../../service/fetch'
import {
  FireOutlined,
  FundViewOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import ListItem, { IArticle, IUser } from '@/components/ListItem'
import { User } from '@/db/entity/user'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../store'

const Page = ({ params: { id } }: { params: { id: number } }) => {
  const [articles, setArticles] = useState([])
  const [user, setUser] = useState<User>()

  const store = useStore()
  const { id: userId } = store.user.userInfo

  useEffect(() => {
    requestGetUser()
  }, [])

  const requestGetUser = () => {
    console.log('发起请求了')
    request.post('/api/user/personal', {}).then((res: any) => {
      if (res?.code === 0) {
        setArticles(res?.data.articles)
        setUser(res?.data.user)
      } else {
        message.error(res?.msg || '文章获取失败')
      }
    })
  }

  return (
    <div className="flex flex-row py-10">
      <div className="flex flex-col w-full bg-white">
        <div className="flex flex-row items-center justify-between p-10 rounded ">
          <div className="flex flex-row items-center">
            <Avatar src={user?.avatar} size={80}></Avatar>
            <div className="flex flex-col ml-10">
              <div className="text-2xl font-bold">{user?.nickname}</div>
              <div className="mt-2 flex flex-row text-gray-400">
                <PhoneOutlined></PhoneOutlined>
                <div className="ml-2">{user?.mobile}</div>
              </div>
              <div className="mt-2 flex flex-row text-gray-400">
                <FireOutlined></FireOutlined>
                <div className="ml-2">{user?.job}</div>
              </div>
              <div className="mt-2 flex flex-row text-gray-400">
                <UserOutlined></UserOutlined>
                <div className="ml-2">{user?.introduce}</div>
              </div>
            </div>
          </div>
          {Number(userId) === Number(id) && (
            <Button href={`/user/profile/${id}`}>编辑个人资料</Button>
          )}
        </div>
        <Divider></Divider>
        {articles?.map((article: IArticle) => (
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

export default observer(Page)
