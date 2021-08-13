import { Module } from '@nestjs/common';
import { ViewModule } from './modules/view/view.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, ViewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
