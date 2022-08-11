import { Global, Module } from '@nestjs/common';
import { TypeormService } from './typeorm.service';

@Global()
@Module({
  providers: [TypeormService],
  exports: [TypeormService],
})
export class TypeormModule {}
