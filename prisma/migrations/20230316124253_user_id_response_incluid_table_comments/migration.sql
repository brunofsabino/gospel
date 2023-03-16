/*
  Warnings:

  - Added the required column `user_idResponse` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "user_idResponse" TEXT NOT NULL;
