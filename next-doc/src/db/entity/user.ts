/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 22:52:48
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-21 13:00:11
 * @FilePath: /next-doc/db/entity/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity { 
    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column()
    nickname!: string

    @Column()
    mobile!: string

    @Column()
    avatar!: string

    @Column()
    job!: string

    @Column()
    introduce!: string
}