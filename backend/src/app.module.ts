import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./shared/modules/database/database.module";
import { DriverModule } from "./modules/driver/driver.module";
import { RideModule } from "./modules/ride/ride.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    DriverModule,
    RideModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../.env",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
