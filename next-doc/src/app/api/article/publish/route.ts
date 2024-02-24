/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 20:41:02
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 18:33:30
 * @FilePath: /next-doc/pages/api/articles.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"
import { Tag } from "@/db/entity/tag"
import { User } from "@/db/entity/user"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

    const title = formData.title
    const content = formData.content
    const id = formData.id
    const tagIDs = formData.tagIDs

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
            id,
    })
    const tags = await AppDataSource.getRepository(Tag).find({
        where: tagIDs?.map((tagId: number) => ({id: tagId}))
    })

    //创建文章
    const article = new Article()
    article.title = title
    article.content = content
    article.create_time = new Date()
    article.update_time = new Date()
    article.is_delete = 0
    article.views = 0

    if (user !== null) {
        article.user = user
    }

    if (tags) {
        article.tags = tags
    }

    const resArticle = await AppDataSource.getRepository(Article).save(article)
    console.log("创建了article" + JSON.stringify(resArticle))

    if (resArticle) {
        return Response.json({
            code: 0,
            msg: '发布文章成功',
            data: resArticle
        })
    } else {
        return Response.json({
            code: 99,
            msg: '发布文章失败',
            data: null
        })
    }
 }