-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "commentReply" TEXT,
ADD COLUMN     "dateCommentReply" TIMESTAMP(3),
ADD COLUMN     "id_commentReply" TEXT,
ADD COLUMN     "imgUserReplyComment" TEXT,
ADD COLUMN     "nameUserReplyComment" TEXT,
ADD COLUMN     "userAvatarCommentReply" TEXT,
ADD COLUMN     "userNameCommentReply" TEXT;

-- AlterTable
ALTER TABLE "response_comments" ADD COLUMN     "userCommentReply" TEXT;
