-- DropForeignKey
ALTER TABLE "commentInForums" DROP CONSTRAINT "commentInForums_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "commentInForums" DROP CONSTRAINT "commentInForums_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "forums" DROP CONSTRAINT "forums_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likeInComments" DROP CONSTRAINT "likeInComments_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "likeInComments" DROP CONSTRAINT "likeInComments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "likeInComments" DROP CONSTRAINT "likeInComments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likeInForums" DROP CONSTRAINT "likeInForums_commentInForum_id_fkey";

-- DropForeignKey
ALTER TABLE "likeInForums" DROP CONSTRAINT "likeInForums_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "likeInForums" DROP CONSTRAINT "likeInForums_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userADMId_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userADMId_fkey" FOREIGN KEY ("userADMId") REFERENCES "userAdm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums" ADD CONSTRAINT "forums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentInForums" ADD CONSTRAINT "commentInForums_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentInForums" ADD CONSTRAINT "commentInForums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInForums" ADD CONSTRAINT "likeInForums_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInForums" ADD CONSTRAINT "likeInForums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInForums" ADD CONSTRAINT "likeInForums_commentInForum_id_fkey" FOREIGN KEY ("commentInForum_id") REFERENCES "commentInForums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
