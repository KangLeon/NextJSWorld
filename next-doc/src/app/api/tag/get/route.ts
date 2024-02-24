/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-24 14:45:30
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 15:00:34
 * @FilePath: /next-doc/src/app/api/tag/get/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initDB } from "@/db"
import { AppDataSource } from "@/db/data-source"
import { Article } from "@/db/entity/article"
import { User } from "@/db/entity/user"
import { Tag } from "@/db/entity/tag"

export async function POST(
    request: Request) {    
    
    const formData = await request.json()

    //const content = formData.type

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
    const tags = await AppDataSource.getRepository(Tag).find()

    console.log("获取到tags" + JSON.stringify(tags))
    if (tags) {
        return Response.json({
            code: 0,
            msg: '获取标签成功',
            data: tags
        })
    } else {
        return Response.json({
            code: 99,
            msg: '获取标签失败',
            data: null
        })
    }
 }