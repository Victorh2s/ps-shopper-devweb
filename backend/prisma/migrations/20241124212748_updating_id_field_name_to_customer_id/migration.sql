/*
  Warnings:

  - The primary key for the `Rides` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Rides` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drivers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Rides" DROP CONSTRAINT "Rides_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" SERIAL NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Rides_pkey" PRIMARY KEY ("customer_id");
