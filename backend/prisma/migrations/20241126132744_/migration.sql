/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rides" DROP CONSTRAINT "Rides_user_id_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "customer_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("customer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_customer_id_key" ON "Users"("customer_id");

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
