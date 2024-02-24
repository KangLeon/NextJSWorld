/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 14:14:27
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-23 19:19:26
 * @FilePath: /next-doc/db/data-source.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Comment } from "./entity/comment";
import { Article } from "./entity/article";
import { Tag } from "./entity/tag";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Article, Comment, Tag],
    logging: ["error"],
})

