import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()
    
    const status = await initDB()
    if (!status) {
        return Response.json({
            code: 99, 
            data: null,
            msg: '数据库初始化失败'
        })
    }

    //获取到所有tag
    const articles = await AppDataSource.getRepository(Article).find({
        relations: ['user'],
    })

    if (articles) {
        return Response.json({
            code: 0,
            msg: '获取文章成功',
            data: articles
        })
    } else {
        return Response.json({
            code: 99,
            msg: '获取文章失败',
            data: null
        })
    }
 }
