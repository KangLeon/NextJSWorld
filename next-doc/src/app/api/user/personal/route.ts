import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"
import { User } from "@/db/entity/user"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

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

    const articles = await AppDataSource.getRepository(Article).find({
        where: {
        user: {
            id: userId,
        },
        },
        relations: ['user', 'tags'],
    })

    if (user) {
        return Response.json({
            code: 0,
            msg: '获取用户成功',
            data: {
                user,
                articles,
            }
        })
    } else {
        return Response.json({
            code: 99,
            msg: '获取用户失败',
            data: null
        })
    }
 }