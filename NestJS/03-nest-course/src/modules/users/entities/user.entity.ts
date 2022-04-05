import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'name', comment: '用户名' })
  name: string;

  @Column({
    type: 'text',
    name: 'password',
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'date',
    name: 'create_time',
    comment: '创建日期',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createTime: Date;

  @Column({
    type: 'date',
    name: 'update_time',
    comment: '更新日期',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updateTime: Date;
}
