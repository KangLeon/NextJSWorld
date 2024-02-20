import { DatabaseType } from './../node_modules/typeorm/browser/driver/types/DatabaseType.d';
/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 22:12:18
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 23:11:12
 * @FilePath: /next-doc/db/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from './entity/user';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "Kangleon28",
    database: "nextDB",
    entities: [User],
    //同步本地的schema与数据库 -》 初始化的时候去使用
    synchronize: true,
    logging: ["error"],
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

