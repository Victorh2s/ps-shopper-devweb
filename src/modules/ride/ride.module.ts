import { Module } from "@nestjs/common";
import { RideController } from "./controllers/ride.controller";
import { RideService } from "./services/ride.service";
import { DatabaseModule } from "src/shared/modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
