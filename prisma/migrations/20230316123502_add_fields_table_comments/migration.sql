/*
  Warnings:

  - Added the required column `imgUserInComment` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameUserInComment` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "imgUserInComment" TEXT NOT NULL,
ADD COLUMN     "imgUserResponseInComment" TEXT,
ADD COLUMN     "nameUserInComment" TEXT NOT NULL,
ADD COLUMN     "nameUserResponseInComment" TEXT;
