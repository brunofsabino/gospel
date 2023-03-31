-- AlterTable
ALTER TABLE "commentInForums" ADD COLUMN     "nickName" TEXT;

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "nickName" TEXT;

-- AlterTable
ALTER TABLE "response_comments" ADD COLUMN     "nickName" TEXT;

-- AlterTable
ALTER TABLE "response_comments_forum" ADD COLUMN     "nickName" TEXT;
