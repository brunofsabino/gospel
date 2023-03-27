-- AlterTable
ALTER TABLE "response_comments" ADD COLUMN     "commentModerationShow" BOOLEAN DEFAULT true,
ADD COLUMN     "commentShow" BOOLEAN DEFAULT true;
