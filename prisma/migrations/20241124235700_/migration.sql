/*
  Warnings:

  - The primary key for the `Rides` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[customer_id]` on the table `Rides` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Rides" DROP CONSTRAINT "Rides_pkey",
ALTER COLUMN "customer_id" DROP DEFAULT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rides_pkey" PRIMARY KEY ("customer_id");
DROP SEQUENCE "Rides_customer_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Rides_customer_id_key" ON "Rides"("customer_id");
