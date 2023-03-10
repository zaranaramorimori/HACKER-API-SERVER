export const SOCIAL = {
  KAKAO: "kakao",
  GOOGLE: "google",
  APPLE: "apple",
  NAVER: "naver",
} as const;

export type UserId = bigint;
export type Uuid = string;
export type SocialPlatform = (typeof SOCIAL)[keyof typeof SOCIAL];

export class UserEntity {
  constructor(
    private readonly _id: UserId,
    private readonly _uuid: Uuid,
    private readonly _provider: SocialPlatform,
    private readonly _nickname: string,
    private readonly _username: string
  ) {}

  get id(): UserId {
    return this._id;
  }

  get uuid(): Uuid {
    return this._uuid;
  }

  get provider(): SocialPlatform {
    return this._provider;
  }

  get nickname(): string {
    return this._nickname;
  }

  get username(): string {
    return this._username;
  }
}
