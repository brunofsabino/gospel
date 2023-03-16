/*
  Warnings:

  - You are about to drop the column `comment_reponse_id` on the `likeInComments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "likeInComments" DROP CONSTRAINT "likeInComments_comment_reponse_id_fkey";

-- DropIndex
DROP INDEX "likeInComments_comment_reponse_id_key";

-- AlterTable
ALTER TABLE "likeInComments" DROP COLUMN "comment_reponse_id";

-- CreateTable
CREATE TABLE "likeInResponseComments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "likeInResponseComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likeInResponseComments_comment_id_key" ON "likeInResponseComments"("comment_id");

-- AddForeignKey
ALTER TABLE "likeInResponseComments" ADD CONSTRAINT "likeInResponseComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInResponseComments" ADD CONSTRAINT "likeInResponseComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInResponseComments" ADD CONSTRAINT "likeInResponseComments_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "response_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
