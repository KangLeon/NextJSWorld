import { setCookie } from '../../../../utils/index';
import { NextApiRequest, NextApiResponse } from "next"
import { AppDataSource } from "../../../../db/data-source"
import { User } from "../../../../db/entity/user"
import { initDB } from "@/db"
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server';

/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 21:41:03
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 18:19:59
 * @FilePath: /next-doc/pages/api/user/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export async function POST(
    request: Request) {    
    const cookieStore = cookies()

    console.log("所有cookie为" + JSON.stringify(cookieStore))

    const formData = await request.json()

    let phone = formData.phone
    let verify = formData.verify

    console.log("输入参数"+JSON.stringify(formData))

    const status = await initDB()
    if (!status) {
        return Response.json({
            code: 99, 
            data: null,
            msg: '登录失败1，数据库初始化失败'
        })
    }
    
    if (verify === '123456') {
        const firstUser = await AppDataSource.getRepository(User).findOneBy({
            mobile: String(phone)
        })
        console.log("当前的客户端" + firstUser)

        if (firstUser) {
            console.log("找到了对应的用户" + JSON.stringify(firstUser))

            setCookie(cookieStore, { id: firstUser.id, nickname: firstUser.nickname, avatar: firstUser.avatar })

            // 找到了对应的用户
            return Response.json({
                code: 0,
                data: firstUser,
                msg: '登录成功'
            })
        } else {
            console.log("没有找到对应的用户，重新创建了" + JSON.stringify(firstUser))
            // 没有找到该用户，那么可以注册用户
            const user = new User()
            user.nickname = "未知"
            user.mobile = phone
            user.avatar = "https://wx4.sinaimg.cn/mw690/9f4cb4b9gy1hm5vu9z04wj21hc1hc10q.jpg"
            user.job = "未知"
            user.introduce = "未知"

            await AppDataSource.getRepository(User).save(user)

            setCookie(cookieStore, { id: user.id, nickname: user.nickname, avatar: user.avatar })

            return Response.json({
                code: 0,
                data: user,
                msg: '登录成功'
            })
        }
    } else {
        return Response.json({
            code: 99, 
            data: null,
            msg: '登录失败2，数据库初始化失败'
        })
    }
 }

