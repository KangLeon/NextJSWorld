/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 23:24:18
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-23 19:21:13
 * @FilePath: /next-doc/src/app/api/article/get/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"
import { User } from "@/db/entity/user"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

    const articleId = formData.articleId
    const view = formData.view
    const user = formData.user
    const comment = formData.comment
    const id = formData.id

    console.log("输入参数"+JSON.stringify(formData))
    
    const status = await initDB()
    if (!status) {
        return Response.json({
            code: 99, 
            data: null,
            msg: '数据库初始化失败'
        })
    }

    let article: Article | null = null
    if (user === 1) {
        if (comment === 1) {
            article = await AppDataSource.getRepository(Article).findOne({
                where: {
                    article_id: articleId
                },
                relations: ['user', 'comments', 'comments.user']
            })
        } else { 
            article = await AppDataSource.getRepository(Article).findOne({
                where: {
                    article_id: articleId
                },
                relations: ['user']
            })
        }
    } else { 
        article = await AppDataSource.getRepository(Article).findOneBy({
                article_id: articleId,
        })
    }


    if (article) {
        console.log("找到了article" + JSON.stringify(article))
        
        if (view === 1) {
            article.views = article?.views + 1
            await AppDataSource.getRepository(Article).save(article)
        }

        return Response.json({
            code: 0,
            msg: '获取文章成功',
            data: article
        })
    } else {
        return Response.json({
            code: 99,
            msg: '获取文章失败',
            data: null
        })
    }
 }