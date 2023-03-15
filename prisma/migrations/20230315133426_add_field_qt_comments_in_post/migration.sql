/*
  Warnings:

  - You are about to drop the column `qt` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "qt";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "qtComments" INTEGER;
