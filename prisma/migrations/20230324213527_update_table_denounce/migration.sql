-- AlterTable
ALTER TABLE "denounces" ADD COLUMN     "describingDenounce" TEXT,
ADD COLUMN     "id_forum" TEXT,
ADD COLUMN     "id_forum_comment" TEXT,
ADD COLUMN     "id_forum_comment_response" TEXT,
ALTER COLUMN "userDenounced_id" DROP NOT NULL,
ALTER COLUMN "nameUserDenounced" DROP NOT NULL;
