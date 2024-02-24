import { EyeOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns';
import Markdown from "react-markdown";

/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 22:06:17
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 16:43:46
 * @FilePath: /next-doc/src/components/ListItem/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type IUser = {
    id: number;
    nickname: string;
    avatar: string;
    mobile: string;
}

export type IArticle = {
    article_id: number;
    title: string;
    content: string;
    create_time: Date
    update_time: Date
    user: IUser
    views: number
}

interface IProps {
  article: IArticle;
}

const ListITem = (props: IProps) => {
    const { article } = props
    const { user } = article
    return <Link href={`/article/${article.article_id}`}>
        <div className="m-0 flex flex-row items-center justify-between p-10 cursor-pointer bg-white rounded-lg">
            <div className="w-4/5">
                <div className="mb-5 flex flex-row items-center">
                    <span className="py-0 px-10 pl-0 border-r border-gray-300 underline hover:text-blue-500">{user?.nickname}</span>
                    <span className='py-0 px-10 text-zinc-700'>{formatDistanceToNow(article.update_time.getTime())}</span>
                </div>
                <h4 className="text-gray-700 text-xl overflow-hidden text-ellipsis whitespace-nowrap mb-5">{article?.title}</h4>
                <p className="text-base text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap mb-5">
                    <Markdown>{article?.content}</Markdown>
                </p>
                <div className='flex flex-row items-center'>
                    <EyeOutlined></EyeOutlined>
                    <span className='ml-5'>{article?.views}</span>
                </div>
            </div>
            <Avatar src={user?.avatar} size={48}></Avatar>
      </div>
  </Link>
}

export default ListITem
