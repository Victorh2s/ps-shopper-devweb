/*
  Warnings:

  - Added the required column `min_trip_km` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drivers" ADD COLUMN     "min_trip_km" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE TEXT;
