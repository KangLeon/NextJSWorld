/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-23 14:54:13
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-23 14:57:03
 * @FilePath: /next-doc/src/db/entity/comment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Article } from "./article";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  create_time!: Date;

  @Column()
  update_time!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" }) // 设置正确的列名作为外键
  user!: User;
    
    @ManyToOne(() => Article)
  @JoinColumn({ name: "article_id" }) // 设置正确的列名作为外键
  article!: Article;
}