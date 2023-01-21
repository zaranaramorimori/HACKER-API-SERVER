import { EInfraInjectionToken } from "@configs/token/InfraInjectionToken";
import { CacheServiceInterface } from "@libraries/cache/cache.interface";
import { UserOrmEntity } from "@libraries/entities/domain/user/user-orm.entity";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateUserOutboundPort,
  CreateUserOutboundPortInputDto,
  CreateUserOutboundPortOutputDto,
} from "../domain/ports/out/create-user.port";
import {
  FindUserOutboundPort,
  FindUserOutboundPortOutputDto,
} from "../domain/ports/out/find-user.port";
import {
  SetTokenOutboundPort,
  SetTokenOutboundPortInputDto,
} from "../domain/ports/out/set-token.port";

@Injectable()
export class SignupAdapter
  implements FindUserOutboundPort, SetTokenOutboundPort, CreateUserOutboundPort
{
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly _userRepository: Repository<UserOrmEntity>,
    @Inject(EInfraInjectionToken.REDIS_JOB.name)
    private readonly _redis: CacheServiceInterface
  ) {}

  async findUser(
    key: string,
    value: string | bigint
  ): Promise<FindUserOutboundPortOutputDto> {
    const user = await this._userRepository.findOne({ [key]: value });
    if (user)
      throw new ConflictException(
        "이미 가입한 유저이거나 사용중인 닉네임입니다."
      );
    return user;
  }

  async setToken(params: SetTokenOutboundPortInputDto): Promise<void> {
    await this._redis.setRefreshToken(params.uuid, params.refreshToken);
  }

  async createUser(
    params: CreateUserOutboundPortInputDto
  ): Promise<CreateUserOutboundPortOutputDto> {
    return await this._userRepository.save({ ...params });
  }
}
