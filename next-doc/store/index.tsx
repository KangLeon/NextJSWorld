/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 15:31:14
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 15:41:39
 * @FilePath: /next-doc/store/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { ReactElement, createContext, useContext } from 'react'
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite'
import createStore, { IStore } from './rootStore'

interface IProps {
  initialValue: Record<any, any>;
  children: ReactElement;
}

enableStaticRendering(true)

const StoreContext = createContext({})

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue))
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => { 
    const store: IStore = useContext(StoreContext) as IStore
    if (!store) {
        throw new Error('数据不存在')
    }
    return store
}
