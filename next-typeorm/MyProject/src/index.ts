/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 14:07:15
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 14:09:36
 * @FilePath: /MyProject/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.nickname = "未知"
    user.mobile = '18687714026'
    user.avatar = ""
    user.job = "未知"
    user.introduce = "未知"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
