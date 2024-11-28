import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/shared/modules/database/database.module";
import { CreateDriverController } from "./controllers/create-driver.controller";
import { CreateDriverService } from "./services/create-driver.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateDriverController],
  providers: [CreateDriverService],
})
export class DriverModule {}
