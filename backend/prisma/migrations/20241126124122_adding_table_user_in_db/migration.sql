/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Rides` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Rides` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rides_customer_id_key";

-- AlterTable
ALTER TABLE "Rides" DROP COLUMN "customer_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "customer_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("customer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_customer_id_key" ON "User"("customer_id");

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
