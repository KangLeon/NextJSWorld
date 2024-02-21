/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 14:14:27
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 14:14:44
 * @FilePath: /next-doc/db/data-source.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { DataSource } from "typeorm";
import { User } from "./entity/user";

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
