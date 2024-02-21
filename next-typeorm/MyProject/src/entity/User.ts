/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 14:07:15
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 14:08:43
 * @FilePath: /MyProject/src/entity/User.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nickname: string

    @Column()
    mobile: string

    @Column()
    avatar: string

    @Column()
    job: string

    @Column()
    introduce: string

}
