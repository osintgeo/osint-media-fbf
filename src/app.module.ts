import { Module } from '@nestjs/common';
import { FileCommand } from './file/file.command';

/**
 * @description
 * @export
 * @class AppModule
 */
@Module({
  providers: [FileCommand],
})
export class AppModule {}
