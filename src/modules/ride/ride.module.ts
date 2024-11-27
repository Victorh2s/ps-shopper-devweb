import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/shared/modules/database/database.module";
import { CalculateRideService } from "./services/calculate-ride.service";
import { ConfirmRideService } from "./services/confirm-ride.service";
import { GetRidesByQuerysService } from "./services/get-rides-by-querys.service";
import { RideEstimateController } from "./controllers/ride-estimate.controller";
import { RideConfirmationController } from "./controllers/ride-confirmation.controller";
import { RidesController } from "./controllers/rides.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    RideEstimateController,
    RideConfirmationController,
    RidesController,
  ],
  providers: [
    CalculateRideService,
    ConfirmRideService,
    GetRidesByQuerysService,
  ],
})
export class RideModule {}
