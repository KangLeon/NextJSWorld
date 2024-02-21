/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 15:19:24
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 16:24:33
 * @FilePath: /next-doc/store/userStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type IUserInfo = {
    id?: number | null;
    nickname?: string;
    mobile?: string,
    avatar?: string;
    job?: string;
    introduce?: string;
}

export interface IUserStore { 
    userInfo: IUserInfo,
    setUserInfo: (value: IUserInfo) => void;
}

const userStore = (): IUserStore => { 
    return {
        userInfo: {},
        setUserInfo: function (value) { 
            console.log("存入store：" + JSON.stringify(value))
            this.userInfo = value
        }
    }
}

export default userStore;