import { rm } from "@libraries/api/response";
import { BadRequestException } from "@nestjs/common";

//todo 리팩토링 필요

export const multerOptions = {
  fileFilter: (req, file, cb: any) => {
    file.mimetype.startsWith("image")
      ? cb(null, true)
      : cb(new BadRequestException(rm.NO_IMAGE_TYPE), false);
  },
};
