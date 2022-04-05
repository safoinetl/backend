import { UnauthorizedException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new UnauthorizedException({ message: 'Only image files are allowed!' }),
      false,
    );
  }
  return callback(null, true);
};
