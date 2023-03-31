/*
  Warnings:

  - A unique constraint covering the columns `[nickName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nickName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_nickName_key" ON "users"("nickName");
