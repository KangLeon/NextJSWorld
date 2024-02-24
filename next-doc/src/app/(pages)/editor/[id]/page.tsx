/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 23:59:05
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 18:34:11
 * @FilePath: /next-doc/src/pages/editor/new.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Button, Input, Select, message } from 'antd'
import request from '../../../../service/fetch'
import { useRouter } from 'next/navigation'
import { ITag } from '../../blogs/page'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

const EditorEdit = ({ params: { id } }: { params: { id: number } }) => {
  const [title, setTitle] = useState('')
  const { push } = useRouter()
  const [content, setContent] = useState('**Hello world!!!**')

  const [allTags, setAllTags] = useState<ITag[]>()
  const [tagIDs, setTagIds] = useState<Array<number>>([])

  useEffect(() => {
    requestGetArticle()
  }, [])

  const requestGetArticle = () => {
    if (id === null || id === undefined) {
      console.log('跳出请求了' + id)
      return
    }
    console.log('发起请求了')
    request
      .post('/api/article/get', {
        articleId: id,
        tag: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setTitle(res.data.title)
          setContent(res.data.content)
          const tags: Array<number> = []
          res?.data?.tags.map((item: ITag) => { 
            tags.push(item.id)
          })
          setTagIds(tags)
        } else {
          message.error(res?.msg || '文章获取失败')
        }
      })
  }

  const handleSelectTag = (value: number[]) => { 
    console.log("选择了"+JSON.stringify(value))
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
        .post('/api/article/update', {
          title,
          content,
          articleId: id, //用户id
          tagIDs,
        })
        .then((res: any) => {
          if (res?.code === 0) {
            message.success('更新成功')
            push(`/article/${id}`)
          } else {
            message.error(res?.msg || '更新失败')
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
  const options = allTags?.map((tag) => (
    {value: tag.id, label: tag.title}
          ))


  return (
    <div className="m-0">
      <div className="flex flex-row">
        <Input
          className=""
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <Select
          allowClear placeholder="请选择标签"
          className="w-1/5"
          mode="multiple"
          value={tagIDs}
          options={options}
          onChange={handleSelectTag}
        />
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

export default EditorEdit
