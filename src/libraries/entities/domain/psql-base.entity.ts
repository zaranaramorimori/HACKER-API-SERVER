import { LocalDateTime } from "@js-joda/core";
import { BigIntTransformer } from "@libraries/utils/big-int-transformer.util";
import { DateUtil } from "@libraries/utils/date.util";
import {
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BasePostgresqlEntity {
  @Generated("increment")
  @PrimaryColumn({ type: "bigint", transformer: new BigIntTransformer() })
  id: bigint;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  getCreatedAt(): LocalDateTime {
    return DateUtil.toLocalDateTime(this.createdAt);
  }

  getUpdatedAt(): LocalDateTime {
    return DateUtil.toLocalDateTime(this.updatedAt);
  }

  getDeleteAt(): LocalDateTime | null {
    return DateUtil.toLocalDateTime(this.deletedAt);
  }
}
