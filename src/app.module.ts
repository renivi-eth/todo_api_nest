import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

import { TagModule } from "./tag/tag.module";
import { ConfigModule } from "@nestjs/config";
import { TaskModule } from "./task/task.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TaskModule,
    TagModule,
    ConfigModule.forRoot(),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
