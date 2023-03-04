/*
  Warnings:

  - A unique constraint covering the columns `[commentInForum_id]` on the table `likeInForums` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "likeInComments" ALTER COLUMN "done" SET DEFAULT true;

-- AlterTable
ALTER TABLE "likeInForums" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "likeInForums_commentInForum_id_key" ON "likeInForums"("commentInForum_id");
