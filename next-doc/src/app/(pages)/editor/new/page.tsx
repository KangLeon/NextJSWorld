/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 23:59:05
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 17:09:19
 * @FilePath: /next-doc/src/pages/editor/new.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Button, Input, Select, message } from 'antd'
import request from '../../../../service/fetch'
import { useStore } from '../../../../../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { ITag } from '../../blogs/page'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

const NewEditor = () => {
  const [title, setTitle] = useState('')
  const { push } = useRouter()

  const [allTags, setAllTags] = useState<ITag[]>()
  const [tagIDs, setTagIds] = useState<number[]>([])
  
  const [content, setContent] = useState('**Hello world!!!**')

  const store = useStore()
  const { id } = store.user.userInfo

  const handleSelectTag = (value: []) => { 
    setTagIds(value)
  }

  useEffect(() => {
    requestGetTags()
  }, [])
  
  const requestGetTags = () => {
    request.post('/api/tag/get', {}).then((res: any) => {
      const tags = res?.data
      setAllTags(tags)
    })
  }

  const handlePublish = () => {
    if (!title) {
      message.warning('请输入标题')
    } else {
      //调用接口
      request
        .post('/api/article/publish', {
          title,
          content,
          id, //用户id
          tagIDs,
        })
        .then((res: any) => {
          if (res?.code === 0) {
            message.success('发布成功')
            push(`/user/${id}`)
          } else {
            message.error(res?.msg || '发布失败')
          }
        })
    }
  }

  const handleTitleChange = (event: any) => {
    setTitle(event?.target?.value)
  }

  const handleContentChange = (content: any) => {
    setContent(content)
  }

  return (
    <div className="m-0">
      <div className="flex flex-row">
        <Input
          className=""
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <Select className="w-1/5" mode='multiple' allowClear placeholder="请选择标签" onChange={handleSelectTag}>
          {allTags?.map((tag) => (
            <Select.Option key={tag.id} value={tag.id}>{ tag?.title}</Select.Option>
          ))}
        </Select>
        <Button type="default" onClick={handlePublish}>
          发布
        </Button>
      </div>
      <MDEditor
        value={content}
        height={1080}
        onChange={handleContentChange}
      ></MDEditor>
    </div>
  )
}

export default observer(NewEditor)
