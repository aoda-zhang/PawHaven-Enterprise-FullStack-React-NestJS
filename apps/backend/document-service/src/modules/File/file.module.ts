import { Module } from '@nestjs/common';

import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  // imports: [MongooseModule.forFeature([{ name: DBCollection.HISTORY, schema: HistorySchema }])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
