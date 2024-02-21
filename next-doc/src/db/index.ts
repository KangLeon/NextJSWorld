import { DatabaseType } from 'typeorm/browser/driver/types/DatabaseType.js';
/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 22:12:18
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 17:13:13
 * @FilePath: /next-doc/db/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "reflect-metadata"
import { AppDataSource } from './data-source';
import { User } from './entity/user';


// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
let isInit: boolean = false

export function initDB() {
    return new Promise((resolve, reject) => { 
        if (isInit) {
            console.log("数据库已经初始化了，不需要再次初始化了")
            resolve(true)
        }
        AppDataSource.initialize()
            .then(async () => {
                console.log("数据库初始化成功")
                // here you can start to work with your database
                isInit = true
                resolve(true)
            })
            .catch((error) => { 
                reject(false)
            })
    })
}

