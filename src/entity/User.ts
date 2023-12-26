import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
    default: '-',
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
    default: '-',
  })
  password: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updateDate: Date;
}
