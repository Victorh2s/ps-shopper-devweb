/*
  Warnings:

  - The primary key for the `Rides` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Rides" DROP CONSTRAINT "Rides_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Rides_pkey" PRIMARY KEY ("id");
