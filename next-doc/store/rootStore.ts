/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 15:25:12
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 15:28:08
 * @FilePath: /next-doc/store/rootStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEexpor
 */
import userStore, { IUserStore } from './userStore'

export interface IStore {
    user: IUserStore;
}

export default function createStore(initialValue: any): () => IStore {
    return () => { 
        return {
            user: { ...userStore(), ...initialValue?.user },
            article: {...userStore(), ...initialValue?.user },
        }
    }
}

