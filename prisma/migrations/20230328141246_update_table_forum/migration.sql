-- AlterTable
ALTER TABLE "forums" ADD COLUMN     "avatar_user" TEXT,
ADD COLUMN     "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nameLastComment" TEXT,
ADD COLUMN     "qtComments" INTEGER;
