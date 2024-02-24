import { title } from './../../../node_modules/@uiw/react-md-editor/src/commands/title';
/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-23 20:12:31
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-23 20:19:03
 * @FilePath: /next-doc/src/db/entity/tag.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user';
import { Article } from './article';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  icon!: string;

    @Column()
    follow_count!: number;
    
    @Column()
    article_count!: number;
    
    @ManyToMany(() => User, {
        cascade: true
    })
    @JoinTable({
        name: 'tags_users_rel',
        joinColumn: {
            name: 'tag_id'
        },
        inverseJoinColumn: {
            name: 'user_id'
        }
    })

    @ManyToMany(() => Article, {
        cascade: true
    })
    @JoinTable({
        name: 'articles_tags_rel',
        joinColumn: {
            name: 'tag_id'
        },
        inverseJoinColumn: {
            name: 'article_id'
        }
    })
    articles!: Article[]

}