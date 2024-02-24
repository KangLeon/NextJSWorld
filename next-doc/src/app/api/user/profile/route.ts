/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-24 18:53:50
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 18:55:34
 * @FilePath: /next-doc/src/app/api/user/profile/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
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

    //获取到所有tag
    const user = await AppDataSource.getRepository(User).findOneBy({
        id: userId,
    })

    if (user) {
        return Response.json({
            code: 0,
            msg: '获取用户成功',
            data: user
        })
    } else {
        return Response.json({
            code: 99,
            msg: '获取用户失败',
            data: null
        })
    }
 }