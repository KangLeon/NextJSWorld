'use client'

import { IArticle, IUser } from '@/components/ListItem'
import { Avatar, Button, Divider, Input, message } from 'antd'
import Link from 'next/link'
import MarkDown from 'markdown-to-jsx'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../store'
import request from '../../../../service/fetch'

export interface IComment { 
  id: number
  content: string
  create_time: string
  update_time: string
  user: IUser
}

const Page = ({ params: { id } }: { params: { id: number } }) => {

  const [article, setArticle] = useState<Record<string, any>>({})
  const [content, setContent] = useState<string>('')
  const [comments, setComments] = useState<Array<IComment>>([])
  const [commentValue, setCommentValue] = useState('')

  const store = useStore()
  const userInfo = store.user.userInfo

  const userId = userInfo.id
  const avatar = userInfo.avatar
  const nickname = userInfo.nickname

  const requestGetArticle = () => {
    if (id === null || id === undefined) {
      console.log('跳出请求了' + id)
      return
    }
    console.log('发起请求了')
    request
      .post('/api/article/get', {
        articleId: id,
        view: 1,
        user: 1,
        comment: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setArticle(res?.data)
          setContent(res?.data?.content)
          setComments(res?.data?.comments)
        } else {
          message.error(res?.msg || '文章获取失败')
        }
      })
  }

  useEffect(() => {
    requestGetArticle()
  }, [])

  const handleComment = () => { 
    request.post('/api/comment/publish', {
      articleId: article?.id,
      content: commentValue,
      userId,
    }).then((res: any) => { 
      if (res?.code === 0) {
        message?.warning('发布评论成功')
        const newComment = [{
          id: Math.random(),
          create_time: new Date().toUTCString(),
          update_time: new Date().toUTCString(),
          content: commentValue,
          user: {
            id: userId || 0,
            avatar: avatar || '',
            nickname: nickname || '',
            mobile: '',
          }
        }, ...comments]
        setComments(newComment)
        setCommentValue('')
      } else { 
        message?.warning('发布评论失败')
      }
    })
  }

  return (
    <div className="mx-40 px-5 py-5 bg-white">
      <h2 className="text-3xl font-bold mb-10 pt-10">{article?.title}</h2>
      <div className="flex flex-row justify-start items-center mb-8">
        <Avatar src={article?.user?.avatar} size={50}></Avatar>
        <div className=" ml-3">
          <div className=" text-sm font-bold mb-2">
            {article?.user?.nickname}
          </div>
          <div className="flex flex-row items-center">
            <div className=" text-xs text-gray-500 ">
              {article?.update_time}
            </div>
            <div className="mx-2 text-xs">阅读 {article?.views}</div>
            {String(userId) === String(article?.user?.id) && (
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
      <MarkDown>{content}</MarkDown>
      <Divider></Divider>
      <div>
        <h3>评论</h3>
        {String(userId) === String(article?.user?.id) && (
          <div className="my-3 flex flex-row">
            <Avatar src={avatar} size={40}></Avatar>
            <div className="ml-5 w-full">
              <Input.TextArea
                placeholder="请输入评论"
                rows={4}
                value={commentValue}
                onChange={(event) => setCommentValue(event?.target?.value)}
              ></Input.TextArea>
              <Button type='primary' className='mt-4' onClick={handleComment}>发表评论</Button>
            </div>
          </div>
        )}
        <div>
          {comments?.map(commentItem => (
            <div className='flex flex-row my-5' key={commentItem.id}>
              <Avatar src={commentItem?.user?.avatar} size={40}></Avatar>
              <div className='flex flex-col ml-4 w-full'>
                <div className='flex flex-row items-center justify-between'>
                  <div className='mr-4 text-base font-bold'>{commentItem?.user?.nickname}</div>
                  <div className='text-base text-gray-400'>{commentItem?.update_time}</div>
                </div>
                <div className='mt-4 text-sm'>{commentItem?.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default observer(Page)
