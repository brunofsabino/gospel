-- AlterTable
ALTER TABLE "commentInForums" ADD COLUMN     "commentModerationShow" BOOLEAN DEFAULT true,
ADD COLUMN     "commentReply" TEXT,
ADD COLUMN     "commentShow" BOOLEAN DEFAULT true,
ADD COLUMN     "dateCommentReply" TIMESTAMP(3),
ADD COLUMN     "id_commentReply" TEXT,
ADD COLUMN     "imgUserInComment" TEXT,
ADD COLUMN     "imgUserReplyComment" TEXT,
ADD COLUMN     "likeShow" BOOLEAN DEFAULT false,
ADD COLUMN     "nameUserInComment" TEXT,
ADD COLUMN     "nameUserReplyComment" TEXT,
ADD COLUMN     "qtLikes" INTEGER,
ADD COLUMN     "userAvatarCommentReply" TEXT,
ADD COLUMN     "userNameCommentReply" TEXT;

-- CreateTable
CREATE TABLE "response_comments_forum" (
    "id" TEXT NOT NULL,
    "forum_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "id_commentForum" TEXT NOT NULL,
    "nameUser" TEXT NOT NULL,
    "imgUser" TEXT NOT NULL,
    "userNameCommentReply" TEXT NOT NULL,
    "userAvatarCommentReply" TEXT NOT NULL,
    "userCommentReply" TEXT,
    "dateCommentReply" TIMESTAMP(3) NOT NULL,
    "qtLikes" INTEGER,
    "likeShow" BOOLEAN DEFAULT false,
    "commentShow" BOOLEAN DEFAULT true,
    "commentModerationShow" BOOLEAN DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment_response" TEXT NOT NULL,

    CONSTRAINT "response_comments_forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likeInResponseCommentsForum" (
    "id" TEXT NOT NULL,
    "forum_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "commentForum_id" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT true,
    "likeShow" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "likeInResponseCommentsForum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "response_comments_forum" ADD CONSTRAINT "response_comments_forum_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response_comments_forum" ADD CONSTRAINT "response_comments_forum_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response_comments_forum" ADD CONSTRAINT "response_comments_forum_id_commentForum_fkey" FOREIGN KEY ("id_commentForum") REFERENCES "commentInForums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInResponseCommentsForum" ADD CONSTRAINT "likeInResponseCommentsForum_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInResponseCommentsForum" ADD CONSTRAINT "likeInResponseCommentsForum_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInResponseCommentsForum" ADD CONSTRAINT "likeInResponseCommentsForum_commentForum_id_fkey" FOREIGN KEY ("commentForum_id") REFERENCES "response_comments_forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;
