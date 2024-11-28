/*
  Warnings:

  - You are about to drop the column `minKmFee` on the `Drivers` table. All the data in the column will be lost.
  - Added the required column `min_km_fee` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drivers" DROP COLUMN "minKmFee",
ADD COLUMN     "min_km_fee" DOUBLE PRECISION NOT NULL;
