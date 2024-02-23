/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-23 14:38:03
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-23 14:42:25
 * @FilePath: /next-doc/src/app/api/article/update/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

    const title = formData.title
    const content = formData.content
    const articleId = formData.articleId

    console.log("输入参数"+JSON.stringify(formData))
    
    const status = await initDB()
    if (!status) {
        return Response.json({
            code: 99, 
            data: null,
            msg: '数据库初始化失败'
        })
    }

    //创建文章
    const article = await AppDataSource.getRepository(Article).findOne({
        where: { article_id: articleId },
        relations: ['user'],
    })

    if (article) {
        article.title = title
        article.content = content
        article.update_time = new Date()

        const resArticle = await AppDataSource.getRepository(Article).save(article)
        console.log("更新了article" + JSON.stringify(resArticle))
        return Response.json({
            code: 0,
            msg: '更新文章成功',
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