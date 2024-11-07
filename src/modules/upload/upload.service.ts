import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import {
  RemoveFileRequest,
  RemoveFileResponse,
  UploadFileRequest,
  UploadFileResponse,
} from './interfaces';
import { existsSync } from 'fs';

@Injectable()
export class UploadService {
  constructor() {}

  async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
    // GENERATE UNIQUE FILE NAME
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    // GET FILE'S FULL PATH
    const uploadDir = path.join(__dirname, '../../../', payload.destination);
    const fullFilePath = path.join(uploadDir, fileName);

    // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
    if (!uploadDir) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // WRITE FILE TO DESTINATION
    fs.writeFileSync(fullFilePath, payload.file.buffer);

    // CREATE IMAGE URL
    const imageUrl = `${payload.destination}/${fileName}`;

    return {
      imageUrl,
      message: 'File written successfully',
    };
  }

  async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
    const filePath = path.join(__dirname, '../../../', payload.fileName);

    const isFileExists = existsSync(filePath);

    // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
    if (isFileExists) {
      fs.unlinkSync(filePath);
    }

    return {
      message: 'File removed successfully',
    };
  }
}
