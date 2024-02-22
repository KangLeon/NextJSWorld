import { setCookie } from '../../../../utils/index';
import { NextApiRequest, NextApiResponse } from "next"
import { AppDataSource } from "../../../../db/data-source"
import { User } from "../../../../db/entity/user"
import { initDB } from "@/db"
import { Cookie } from 'next-cookie'

/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 21:41:03
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 00:32:42
 * @FilePath: /next-doc/pages/api/user/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default async function login(
    req: NextApiRequest,
    res: NextApiResponse) {    
    const cookies = Cookie.fromApiRoute(req, res)
    const { phone, verify } = req.body

    console.log("输入参数"+phone)

    const status = await initDB()
    if (!status) {
        res.status(200).json({
            code: 99, 
            data: null,
            msg: '登录失败，数据库初始化失败'
        })
    }
    
    if (verify === '123456') {
        try {
            const firstUser = await AppDataSource.getRepository(User).findOneBy({
                mobile: String(phone)
            })
            console.log("当前的客户端" + firstUser)

            if (firstUser) {
                console.log("找到了对应的用户" + JSON.stringify(firstUser))
                setCookie(cookies, { id: firstUser.id, nickname: firstUser.nickname, avatar: firstUser.avatar })
                // 找到了对应的用户
                res.status(200).json({
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

                setCookie(cookies, { id: user.id, nickname: user.nickname, avatar: user.avatar })
                
                res.status(200).json({
                    code: 0,
                    data: user,
                    msg: '登录成功'
                })
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            res.status(200).json({
                code: 99, 
                data: null,
                msg: '登录失败，验证码输出错误'
            })
        }

    } else {
        res.status(200).json({
            code: 99, 
            data: null,
            msg: '登录失败，验证码输出错误'
        })
    }
}