import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dto/upload-files.dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UploadFileResponse } from './interfaces/upload-file.interfaces';
import { RemoveFileDto } from './dto/remove-files.dtos';
import { RemoveFileResponse } from './interfaces/remove-file.interfaces';

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