/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 20:23:36
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 20:32:34
 * @FilePath: /next-doc/src/service/fetch.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

const requestInstance = axios.create({
    baseURL: '/'
})

requestInstance.interceptors.request.use((config) => config, (error) => Promise.reject(error))

requestInstance.interceptors.response.use(response => {
    if (response?.status === 200) {
        return response?.data
    } else { 
        return {
            code: -1,
            msg: '未知错误',
            data: null,
        }
    }
}, (error) => Promise.reject(error))

export default requestInstance;