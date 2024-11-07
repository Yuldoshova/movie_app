import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RemoveFileResponse, UploadFileResponse } from './interfaces';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dtos/upload-files.dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { RemoveFileDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('uploads')
export class UploadController {
  constructor(private service: UploadService) {}

  // @ApiBearerAuth()
  // @Protected(true)
  // @Roles([UserRoles.admin])
  // @ApiOperation({ summary: 'Yangi file yaratish' })
  // @ApiConsumes("multipart/form-data")
  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }

  // @ApiBearerAuth()
  // @Protected(true)
  // @Roles([UserRoles.admin])
  // @ApiOperation({ summary: 'mavjud faylni o\'chirish' })
  @Delete('/remove')
  async removeFile(
    @Body() payload: RemoveFileDto,
  ): Promise<RemoveFileResponse> {
    return this.service.removeFile(payload);
  }
}
