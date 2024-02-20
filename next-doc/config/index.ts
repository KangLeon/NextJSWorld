/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 21:16:26
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 21:25:07
 * @FilePath: /next-doc/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const ironOptions = {
    cookieNAme: process.env.SESSION_COOKIE_NAME as string,
    password: process.env.SESSION_PASSWORD as string,
    cookieOptions: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
    }
}