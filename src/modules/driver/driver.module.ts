import { Module } from "@nestjs/common";
import { DriverController } from "./controllers/driver.controller";
import { DriverService } from "./services/driver.service";
import { DatabaseModule } from "src/shared/modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
