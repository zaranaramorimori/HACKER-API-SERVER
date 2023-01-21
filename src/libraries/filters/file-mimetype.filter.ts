import { rm } from "@libraries/api/response";
import { BadRequestException } from "@nestjs/common";

//todo 리팩토링 필요

//* 단일 파일
export const imageFileFilter = (
  req: Express.Request,
  file: Express.MulterS3.File,
  cb: any
) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new BadRequestException(rm.NO_IMAGE_TYPE), false);
};

//* 다중 파일
export const imageFilesFilter = (
  req: Express.Request,
  file: Express.MulterS3.File,
  cb: any
) => {
  file.mimetype.startsWith("image") ? cb(null, true) : cb(null, false);
};
