/*
  Warnings:

  - You are about to drop the column `car` on the `Drivers` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Drivers` table. All the data in the column will be lost.
  - Added the required column `vehicle` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drivers" DROP COLUMN "car",
DROP COLUMN "rating",
ADD COLUMN     "vehicle" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "driver_id" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
