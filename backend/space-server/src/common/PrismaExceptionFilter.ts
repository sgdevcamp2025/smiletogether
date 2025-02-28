import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 1004;
    let message = '서버 내부 오류가 발생했습니다.';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(exception.code, exception.meta);
      switch (exception.code) {
        case 'P2002':
          statusCode = HttpStatus.CONFLICT;
          code = 1001;
          message = `이미 존재하는 데이터입니다.`;
          break;
        case 'P2025':
          statusCode = HttpStatus.NOT_FOUND;
          code = 1002;
          message = `해당 데이터를 찾을 수 없습니다.`;
          break;
        case 'P2023':
          statusCode = HttpStatus.BAD_REQUEST;
          code = 1003;
          if (exception.message.includes('Error creating UUID')) {
            message = '유효하지 않은 UUID 형식입니다.';
            code = 1006;
          } else {
            message = '유효하지 않은 데이터 형식입니다.';
          }
          break;
        default:
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          code = 1004;
          message = `Prisma 오류 발생: ${exception.message}`;
          break;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      console.error(exception.message);
      statusCode = HttpStatus.BAD_REQUEST;
      code = 1005;
      message = `데이터 필드가 누락되거나 잘못 되었습니다.`;
    }

    return response.status(statusCode).json({
      code,
      message,
    });
  }
}
