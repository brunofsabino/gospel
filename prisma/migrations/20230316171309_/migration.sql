/*
  Warnings:

  - Added the required column `comment_response` to the `response_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response_comments" ADD COLUMN     "comment_response" TEXT NOT NULL;
