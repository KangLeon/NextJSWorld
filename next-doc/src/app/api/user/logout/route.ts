/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 23:03:14
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 17:30:27
 * @FilePath: /next-doc/src/pages/api/user/logout.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextApiRequest, NextApiResponse } from "next"
import { Cookie } from 'next-cookie'
import { clearCookie } from "@/utils"
import { cookies } from "next/headers"

export async function POST(
    request: Request) {    
    const cookieStore = cookies()
    clearCookie(cookieStore)

    return Response.json({
        code: 0,
        msg: '退出成功',
        data: {}
    })
 }
