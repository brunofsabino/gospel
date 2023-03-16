/*
  Warnings:

  - You are about to drop the column `id_comment` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `imgUserResponseInComment` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `nameUserResponseInComment` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_idResponse` on the `comments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[comment_reponse_id]` on the table `likeInComments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `comment_reponse_id` to the `likeInComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "id_comment",
DROP COLUMN "imgUserResponseInComment",
DROP COLUMN "nameUserResponseInComment",
DROP COLUMN "user_idResponse";

-- AlterTable
ALTER TABLE "likeInComments" ADD COLUMN     "comment_reponse_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "response_comments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "id_comment" TEXT NOT NULL,
    "nameUser" TEXT NOT NULL,
    "imgUser" TEXT NOT NULL,
    "userNameCommentReply" TEXT NOT NULL,
    "userAvatarCommentReply" TEXT NOT NULL,
    "dateCommentReply" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "response_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likeInComments_comment_reponse_id_key" ON "likeInComments"("comment_reponse_id");

-- AddForeignKey
ALTER TABLE "response_comments" ADD CONSTRAINT "response_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response_comments" ADD CONSTRAINT "response_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response_comments" ADD CONSTRAINT "response_comments_id_comment_fkey" FOREIGN KEY ("id_comment") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_comment_reponse_id_fkey" FOREIGN KEY ("comment_reponse_id") REFERENCES "response_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
