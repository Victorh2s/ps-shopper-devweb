import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./shared/modules/database/database.module";
import { DriverModule } from "./modules/driver/driver.module";
import { RideModule } from "./modules/ride/ride.module";

@Module({
  imports: [DatabaseModule, DriverModule, RideModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
