/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 23:24:18
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 23:40:33
 * @FilePath: /next-doc/src/app/api/article/get/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 23:24:18
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 17:04:41
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
    const tag = formData.tag
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
    if (user === 1 || comment === 1 || tag === 1) {
        const relations: string[] = []

        if (user === 1) {
            relations.push('user')
        }
        if (comment === 1) {
            relations.push('comments')
            relations.push('comments.user')
        }
        if (tag === 1) {
            relations.push('tags')
        }

        console.log('获取到的relations:' + JSON.stringify(relations))

        article = await AppDataSource.getRepository(Article).findOne({
            where: {
                article_id: articleId
            },
            relations
        })
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