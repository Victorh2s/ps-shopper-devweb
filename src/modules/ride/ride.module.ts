import { Module } from "@nestjs/common";
import { RideController } from "./controllers/ride.controller";
import { RideService } from "./services/ride.service";

@Module({
  imports: [],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
