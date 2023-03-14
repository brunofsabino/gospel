/*
  Warnings:

  - Added the required column `subTitle` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summaryParagraph` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "mainNewsShow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "newsShow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slideShow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subTitle" TEXT NOT NULL,
ADD COLUMN     "summaryParagraph" TEXT NOT NULL,
ADD COLUMN     "updatedIn" TIMESTAMP(3);
