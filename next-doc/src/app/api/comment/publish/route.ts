/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-23 16:50:18
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-23 17:00:43
 * @FilePath: /next-doc/src/app/api/comment/publish/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"
import { Comment } from "@/db/entity/comment"
import { User } from "@/db/entity/user"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

    const content = formData.content
    const articleId = formData.articleId
    const userId = formData.userId

    console.log("输入参数"+JSON.stringify(formData))
    
    const status = await initDB()
    if (!status) {
        return Response.json({
            code: 99, 
            data: null,
            msg: '数据库初始化失败'
        })
    }

    const user = await AppDataSource.getRepository(User).findOneBy({
            id: userId,
    })
    const article = await AppDataSource.getRepository(Article).findOneBy({
        article_id: articleId
    })

    //创建文章
    const comment = new Comment()
    comment.content = content
    comment.create_time = new Date()
    comment.update_time = new Date()

    if (user !== null) {
        comment.user = user
    }
    if (article) {
        comment.article = article
    }

    const resComment = await AppDataSource.getRepository(Comment).save(comment)

    if (resComment) {
        return Response.json({
            code: 0,
            msg: '发布评论成功',
            data: resComment
        })
    } else {
        return Response.json({
            code: 99,
            msg: '发布评论失败',
            data: null
        })
    }
 }