import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { User } from "@/db/entity/user"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

    const userId = formData.userId
    const nickname = formData.nickname
    const job = formData.job
    const introduce = formData.introduce

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
    const user = await AppDataSource.getRepository(User).findOne({
        where: { id: userId },
    })

    if (user) {
        user.nickname = nickname
        user.job = job
        user.introduce = introduce

        await AppDataSource.getRepository(User).save(user)

        return Response.json({
            code: 0,
            msg: '更新用户个人信息成功',
            data: user
        })
    } else {
        return Response.json({
            code: 99,
            msg: '更新用户个人信息失败',
            data: null
        })
    }
 }