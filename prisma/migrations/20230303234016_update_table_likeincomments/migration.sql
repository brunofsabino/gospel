/*
  Warnings:

  - A unique constraint covering the columns `[comment_id]` on the table `likeInComments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likeInComments_comment_id_key" ON "likeInComments"("comment_id");
