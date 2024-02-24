'use client'

import { IUser } from "@/components/ListItem"
import { Space, Tabs, TabsProps, Tag } from "antd"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useStore } from "../../../../store"
import request from '../../../service/fetch'
import { getRandomColor } from "@/utils"

/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 11:50:09
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 15:02:13
 * @FilePath: /next-doc/src/app/blogs/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface ITag { 
  id: number
  title: string
  icon: string
  follow_count: number
  article_count: number
  user: IUser[]
}

const Page = () => {
  const store = useStore()

  const [allTags, setAllTags] = useState<ITag[]>()

  const { id: userId, nickname, avatar } = store?.user?.userInfo

  useEffect(() => {
    requestGetTags()
  }, [])
  
  const requestGetTags = () => {
    request.post('/api/tag/get', {}).then((res: any) => {
      const tags = res?.data
      setAllTags(tags)
    })
  }

  const onChange = (key: string) => {
    console.log(key);
  };


  const items: TabsProps['items'] = [
  {
    key: 'all',
    label: '所有文章',
      children: <div>
        <div>
          <Space size={[0, 8]} wrap>
            {allTags?.map((item: ITag) => { 
              return <Tag className=" cursor-pointer" key={item.id} color={getRandomColor()}>{item.title}</Tag>
            })}
          </Space>
        </div>
        
    </div>,
  },
  {
    key: 'new',
    label: '最新文章',
    children: <div>
        <div>
          <Space size={[0, 8]} wrap>
            {allTags?.map((item: ITag) => { 
              return <Tag className=" cursor-pointer" key={item.id} color={getRandomColor()}>{item.title}</Tag>
            })}
          </Space>
        </div>
        
    </div>,
  },
  {
    key: 'weekly',
    label: 'AI 周报',
    children: <div>
        <div>
          <Space size={[0, 8]} wrap>
            {allTags?.map((item: ITag) => { 
              return <Tag className=" cursor-pointer" key={item.id} color={getRandomColor()}>{item.title}</Tag>
            })}
          </Space>
        </div>
        
    </div>,
  },
  {
    key: 'coder',
    label: '程序员专区',
    children: <div>
        <div>
          <Space size={[0, 8]} wrap>
            {allTags?.map((item: ITag) => { 
              return <Tag className=" cursor-pointer" key={item.id} color={getRandomColor()}>{item.title}</Tag>
            })}
          </Space>
        </div>
        
    </div>,
  },
  ];1
  return <div className="mx-40">
    <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
  </div>
}

export default observer(Page)
