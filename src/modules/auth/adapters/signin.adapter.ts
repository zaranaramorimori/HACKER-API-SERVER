import { EInfraInjectionToken } from "@configs/token/InfraInjectionToken";
import { rm } from "@libraries/api/response";
import { CacheServiceInterface } from "@libraries/cache/cache.interface";
import { UserOrmEntity } from "@libraries/entities/domain/user/user-orm.entity";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  FindUserOutboundPort,
  FindUserOutboundPortOutputDto,
} from "../domain/ports/out/find-user.port";
import {
  SetTokenOutboundPort,
  SetTokenOutboundPortInputDto,
} from "../domain/ports/out/set-token.port";

@Injectable()
export class SigninAdapter
  implements FindUserOutboundPort, SetTokenOutboundPort
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
    if (!user) throw new NotFoundException(rm.NO_USER);
    return user;
  }

  async setToken(params: SetTokenOutboundPortInputDto): Promise<void> {
    await this._redis.setRefreshToken(params.uuid, params.refreshToken);
  }
}
