/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 17:28:38
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 17:31:59
 * @FilePath: /next-doc/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface ICookieInfo { 
    userId: number;
    nickname: string;
    avatar: string;
}

export const setCookie = (cookies: any, { userId, nickname, avatar }: ICookieInfo) => { 
    // 登录实效， 24h
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const path = '/'

    cookies.set('userId', userId, {
        path, 
        expires
    })
    cookies.set('nickname', nickname, {
        path, 
        expires
    })
    cookies.set('avatar', avatar, {
        path, 
        expires
    })
}