/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-22 20:35:03
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 21:46:23
 * @FilePath: /next-doc/src/db/entity/article.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"


@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  article_id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  views!: number;

  @Column()
  create_time!: Date;

  @Column()
  update_time!: Date;

  @Column()
  is_delete!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" }) // 设置正确的列名作为外键
  user!: User;
}