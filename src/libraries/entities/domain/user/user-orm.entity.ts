import { Column, Entity } from "typeorm";
import { BasePostgresqlEntity } from "../psql-base.entity";

export type SocialPlatform = "kakao" | "apple" | "google" | "naver";

@Entity("User")
export class UserOrmEntity extends BasePostgresqlEntity {
  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
    unique: true,
  })
  uuid: string;

  @Column({
    length: 10,
    nullable: false,
  })
  provider: SocialPlatform;

  @Column({
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    length: 6,
    unique: true,
    nullable: false,
  })
  nickname: string;
}
